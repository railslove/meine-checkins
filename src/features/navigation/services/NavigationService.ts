import {createRef} from 'react';
import {NavigationContainerRef, StackActions, TabActions} from '@react-navigation/core';
import {
  BottomTabsRoutes,
  MyCheckInsRoutes,
  RootStackRoutes,
  ScanQRCodeRoutes,
} from 'src/features/navigation/routes';

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
 *    - MyCheckInsStackNavigator
 *      - MyCheckInsScreen
 *      - ProviderFormScreen
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
      : TabActions.jumpTo(BottomTabsRoutes.CheckInsNavigator, {
          screen: MyCheckInsRoutes.MyCheckIns,
        });
  };

  fromMyCheckIns = (screen: MyCheckInsRoutes | ScanQRCodeRoutes) => {
    return this.navigate(screen);
  };

  fromScanQRScreen = () => {
    return this.dispatch(
      TabActions.jumpTo(BottomTabsRoutes.CheckInsNavigator, {
        screen: MyCheckInsRoutes.ProviderForm,
      })
    );
  };

  fromProfileFormCheckout = () => {
    return this.dispatch(
      TabActions.jumpTo(BottomTabsRoutes.CheckInsNavigator, {
        screen: MyCheckInsRoutes.MyCheckIns,
      })
    );
  };
}

export default new NavigationService();
