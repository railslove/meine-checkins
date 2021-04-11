import {ActionType, isActionOf} from 'typesafe-actions';
import {StackActions} from '@react-navigation/routers';

import {BottomTabsRoutes, MyCheckInsRoutes, RootStackRoutes} from 'src/features/navigation/routes';
import {StoreDispatch, StoreState} from 'src/shared/redux/store';

import NavigationService from 'src/features/navigation/services/NavigationService';
import * as navigationActions from 'src/features/navigation/actions/navigationActions';

type NavigateToThunk<A = ActionType<typeof navigationActions>> = (
  action: A
) => (dispatch: StoreDispatch, getState: () => StoreState) => void;

/**
 * navigate thunk using the defined actions
 *
 * note: we don't need to handle cases coming from
 * - start screen -> already setup on RootStackNavigator and has no back button
 * - bottom tab navigator -> does not have a back button and initial screen is set there
 * - navigation to FAQ or Imprint since they are coming from MyCheckIns screen
 *
 * We only need to handle cases when the user clicked on a submit button on a screen
 */
export const navigateThunk: NavigateToThunk = action => (dispatch, getState) => {
  const {to} = action.payload;
  const {checkIns} = getState();

  // this might disable bottom navigation or other screen options
  dispatch(action);

  if (isActionOf(navigationActions.navigateFromStartAction)(action)) {
    return NavigationService.dispatch(StackActions.replace(RootStackRoutes.BottomTabNavigator));
  }

  if (isActionOf(navigationActions.navigateFromProfileAction)(action)) {
    return checkIns.current
      ? NavigationService.navigate(MyCheckInsRoutes.MyCheckIns)
      : NavigationService.navigate(BottomTabsRoutes.ScanQRCode);
  }

  if (isActionOf(navigationActions.navigateFromScanQRAction)(action)) {
    return NavigationService.navigate(MyCheckInsRoutes.ProviderForm);
  }

  if (isActionOf(navigationActions.navigateFromProviderForm)(action)) {
    // we can only go back to my check-ins
    // if we use the bottom navigation we will not end up here
    return NavigationService.navigate(MyCheckInsRoutes.MyCheckIns);
  }

  if (to) {
    return NavigationService.navigate(to);
  }

  /**
   * no to given, we have to figure it out
   */
};
