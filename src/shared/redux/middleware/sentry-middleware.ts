import {getType} from 'typesafe-actions';
import BuildConfig from 'react-native-config';
import {Middleware} from 'redux';
import * as Sentry from '@sentry/react-native';

import {providerScanQRAction} from 'src/shared/redux/actions/providerActions';
import {APP_ID, RELEASE_VERSION} from 'src/config';
import {StoreDispatch, StoreState} from 'src/shared/redux/store';

Sentry.init({
  dsn: BuildConfig.SENTRY_DSN,
  release: `${APP_ID}-${__DEV__ ? 'dev' : 'prod'}@${RELEASE_VERSION}`,
});

export const SENTRY_ENV = __DEV__ ? 'development' : 'production';

export const createSentryMiddleware: () => Middleware<{}, StoreState, StoreDispatch> = () => {
  return () => {
    // assigning null is a workaround since sentry api normalizes the store data and converts undefined to '[undefined]'
    let previousAction: string | null = null;

    return next => action => {
      switch (action.type) {
        case getType(providerScanQRAction): {
          const {payload}: ReturnType<typeof providerScanQRAction> = action;
          const options = {
            tags: {
              env: SENTRY_ENV,
              action: action.type,
              ...payload,
            },
            level: Sentry.Severity.Info,
            previousAction,
          };

          if (!payload.isQRCodeURL) {
            Sentry.captureMessage(`${action.type}: not QR`, options);
          } else if (!payload.isTrusted) {
            Sentry.captureMessage(`${action.type}: unknown`, options);
          }
        }
      }

      previousAction = action.type;
      return next(action);
    };
  };
};
