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
 *    - MyCheckInsStackNavigator
 *      - MyCheckInsScreen
 *      - ProviderFormScreen
 *      - FAQScreen
 *      - ImprintScreen
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
    return checkIns.current
      ? this.navigate(MyCheckInsRoutes.MyCheckIns)
      : this.navigate(BottomTabsRoutes.ScanQRCode);
  };

  fromMyCheckIns = (screen: MyCheckInsRoutes) => {
    return this.navigate(screen);
  };

  fromScanQRScreen = () => {
    return this.dispatch(
      TabActions.jumpTo(BottomTabsRoutes.MyCheckIns, {
        screen: MyCheckInsRoutes.ProviderForm,
      })
    );
  };

  fromProfileFormCheckout = () => {
    return this.dispatch(StackActions.replace(MyCheckInsRoutes.MyCheckIns));
  };
}

export default new NavigationService();
