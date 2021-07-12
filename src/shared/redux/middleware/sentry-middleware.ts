import {Middleware} from 'redux';
import * as Sentry from '@sentry/react-native';

import {StoreDispatch, StoreState} from 'src/shared/redux/store';
import {APP_ID, RELEASE_VERSION} from 'src/config';

Sentry.init({
  dsn: 'https://c6306569f95245278cec328a3558a04e@o914340.ingest.sentry.io/5853066',
  release: `${APP_ID}@${RELEASE_VERSION}`,
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
      Sentry.captureMessage(action.type, {
        level: Sentry.Severity.Info,
      });

      lastAction = action.type;
      return next(action);
    };
  };
};