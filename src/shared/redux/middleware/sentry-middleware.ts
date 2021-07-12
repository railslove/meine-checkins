import {Middleware} from 'redux';
import * as Sentry from '@sentry/react-native';

import {StoreDispatch, StoreState} from 'src/shared/redux/store';
import {APP_ID, RELEASE_VERSION} from 'src/config';
import {getType} from 'typesafe-actions';
import {providerScanQRAction} from 'src/shared/redux/actions/providerActions';

Sentry.init({
  dsn: 'https://c6306569f95245278cec328a3558a04e@o914340.ingest.sentry.io/5853066',
  release: `${APP_ID}-${__DEV__ ? 'dev' : 'prod'}@${RELEASE_VERSION}`,
});

export const createSentryMiddleware: () => Middleware<{}, StoreState, StoreDispatch> = () => {
  return ({getState}) => {
    // assigning null is a workaround since sentry api normalizes the store data and converts undefined to '[undefined]'
    let lastAction: string | null = null;

    Sentry.configureScope(scope => {
      scope.addEventProcessor(event => {
        const state = getState();

        event.extra = {
          ...event.extra,
          state,
          lastAction,
        };

        return event;
      });
    });

    return next => action => {
      switch (action.type) {
        case getType(providerScanQRAction): {
          Sentry.captureMessage(action.type, {
            tags: {
              action: action.type,
              ...action.payload,
            },
            level: Sentry.Severity.Info,
          });
        }
      }

      lastAction = action.type;
      return next(action);
    };
  };
};
