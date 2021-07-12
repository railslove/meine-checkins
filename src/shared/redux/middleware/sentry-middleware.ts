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

    Sentry.configureScope(scope => {
      scope.addEventProcessor(event => {
        event.extra = {
          ...event.extra,
          env: SENTRY_ENV,
          previousAction,
        };

        return event;
      });
    });

    return next => action => {
      switch (action.type) {
        case getType(providerScanQRAction): {
          const {payload}: ReturnType<typeof providerScanQRAction> = action;

          if (!payload.isQRCodeURL) {
            Sentry.captureMessage(`${action.type}: not a QR`, {
              tags: {
                action: action.type,
                ...payload,
              },
              level: Sentry.Severity.Info,
            });
          } else if (!payload.isTrusted) {
            Sentry.captureMessage(`${action.type}: unknown`, {
              tags: {
                action: action.type,
                ...payload,
              },
              level: Sentry.Severity.Info,
            });
          }
        }
      }

      previousAction = action.type;
      return next(action);
    };
  };
};
