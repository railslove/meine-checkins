import {createRef} from 'react';
import {NavigationContainerRef, StackActions, TabActions} from '@react-navigation/core';
import {BottomTabsRoutes, MyCheckInsRoutes, RootStackRoutes} from 'src/features/navigation/routes';

import User from 'src/shared/models/User';
import {StoreState} from 'src/shared/redux/store';

export const rootNavigationRef = createRef<NavigationContainerRef>();

type DispatchArgs = Parameters<NavigationContainerRef['dispatch']>;
type NavigateParams = Parameters<NavigationContainerRef['navigate']>;

/**
 * Routing on the app goes
 *
 * RootStackNavigator
 *  - StartScreen
 *  - BottomTabsNavigator
 *    - ProfileScreen
 *    - ScanQRScreen
 *    - ProviderFormScreen
 *    - MyCheckInsStackNavigator
 *      - MyCheckInsScreen
 *      - FAQScreen
 *      - ImprintScreen
 *
 * NOTE: here we only have to take care navigation that happens after submit of a screen
 * everything else is handled by the navigators
 */
class NavigationService {
  private getRef = () => {
    return rootNavigationRef?.current;
  };

  private navigate = (name: string, params?: NavigateParams) => {
    return this.getRef()?.navigate(name, params);
  };

  private dispatch = (...args: DispatchArgs) => {
    return this.getRef()?.dispatch(...args);
  };

  fromBottomTabs = (route: BottomTabsRoutes) => {
    switch (route) {
      case BottomTabsRoutes.CheckInsNavigator: {
        return this.dispatch(
          TabActions.jumpTo(BottomTabsRoutes.CheckInsNavigator, {
            screen: MyCheckInsRoutes.MyCheckIns,
          })
        );
      }
      default: {
        return this.dispatch(TabActions.jumpTo(route));
      }
    }
  };

  fromStartScreen = (user?: User) => {
    return user == null
      ? this.dispatch(StackActions.replace(RootStackRoutes.BottomTabNavigator))
      : this.dispatch(
          StackActions.replace(RootStackRoutes.BottomTabNavigator, {
            screen: BottomTabsRoutes.ScanQRCode,
          })
        );
  };

  fromProfileScreen = (checkIns: StoreState['checkIns']) => {
    return checkIns.items.length
      ? this.navigate(BottomTabsRoutes.ScanQRCode)
      : this.navigate(BottomTabsRoutes.CheckInsNavigator);
  };

  fromMyCheckIns = (screen: MyCheckInsRoutes | BottomTabsRoutes) => {
    switch (screen) {
      case BottomTabsRoutes.ProviderForm: {
        return this.fromBottomTabs(BottomTabsRoutes.ProviderForm);
      }
      default: {
        return this.navigate(screen);
      }
    }
  };

  fromScanQRScreen = () => {
    return this.dispatch(TabActions.jumpTo(BottomTabsRoutes.ProviderForm));
  };

  fromEmptyProviderForm = () => {
    return this.navigate(BottomTabsRoutes.ScanQRCode);
  };

  fromProviderFormCheckout = () => {
    return this.dispatch(
      TabActions.jumpTo(BottomTabsRoutes.CheckInsNavigator, {
        screen: MyCheckInsRoutes.MyCheckIns,
      })
    );
  };
}

export default new NavigationService();
