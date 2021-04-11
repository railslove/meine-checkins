import {createAction} from 'typesafe-actions';

import User from 'src/shared/models/User';
import {RootStackRoutes, BottomTabsRoutes, MyCheckInsRoutes} from 'src/features/navigation/routes';

export type NavigationRoutes = RootStackRoutes | BottomTabsRoutes | MyCheckInsRoutes;

export type NavigationPayload<ToRoute extends NavigationRoutes> = {
  to?: ToRoute;
  from: Omit<NavigationRoutes, ToRoute>;
};

// root stack navigator
export const navigateFromStartAction = createAction(
  '@navigation-from/start',
  (): NavigationPayload<RootStackRoutes.BottomTabNavigator> => ({
    to: RootStackRoutes.BottomTabNavigator,
    from: RootStackRoutes.Start,
  })
)();

/**
 * bottom navigator
 */

export const navigateFromProfileAction = createAction(
  '@navigate-from/profile',
  (payload: NavigationRoutes): NavigationPayload<typeof payload> => ({
    to: payload,
    from: BottomTabsRoutes.Profile,
  })
)();

export const navigateFromScanQRAction = createAction(
  '@navigate-from/scan-qr',
  (payload: NavigationRoutes): NavigationPayload<typeof payload> => ({
    to: payload,
    from: BottomTabsRoutes.ScanQRCode,
  })
)();

export const navigateFromMyCheckInsScreen = createAction(
  '@navigate-from/fmy-check-ins',
  (payload: NavigationRoutes): NavigationPayload<typeof payload> => ({
    to: payload,
    from: BottomTabsRoutes.MyCheckIns,
  })
)();

/**
 * my check-ins navigator
 */
export const navigateFromProviderForm = createAction(
  '@navigate-from/provider-form',
  (payload: NavigationRoutes): NavigationPayload<typeof payload> => ({
    to: payload,
    from: BottomTabsRoutes.Profile,
  })
)();
