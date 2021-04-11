import {createRef} from 'react';
import {NavigationContainerRef, StackActions, TabActions} from '@react-navigation/core';
import {StoreState} from 'src/shared/redux/store';
import {BottomTabsRoutes, MyCheckInsRoutes, RootStackRoutes} from 'src/features/navigation/routes';
import User from 'src/shared/models/User';

export const rootNavigationRef = createRef<NavigationContainerRef>();

type NavigateParams = Parameters<NavigationContainerRef['navigate']>;

type DispatchArgs = Parameters<NavigationContainerRef['dispatch']>;

class NavigationService {
  private getRef = () => {
    return rootNavigationRef?.current;
  };

  canGoBack = () => {
    const indeedCan = this.getRef()?.canGoBack();

    return indeedCan || false;
  };

  goBack = () => {
    return this.getRef()?.goBack();
  };

  navigate = (name: string, params?: NavigateParams) => {
    return this.getRef()?.navigate(name, params);
  };

  dispatch = (...args: DispatchArgs) => {
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
