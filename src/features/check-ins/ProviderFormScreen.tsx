import {useTheme} from 'react-native-paper';
import React, {useCallback} from 'react';
import {WebViewMessageEvent} from 'react-native-webview';
import {useSelector, useStore} from 'react-redux';

import {
  providerCheckInAction,
  providerCheckOutAction,
  providerSetLogoAction,
} from 'src/shared/redux/actions/providerActions';

import {
  parseProviderWebviewMessage,
  prepareFillFormInWebViewInject,
} from 'src/features/check-ins/providerFormLib';

import NavigationService from 'src/features/navigation/services/NavigationService';

import Box from 'src/shared/components/Layout/Box';
import CachedWebView from 'src/shared/components/WebView/CachedWebView';

const ProviderFormScreen: React.FC = () => {
  const theme = useTheme();
  const store = useStore();

  const user = useSelector(state => state.user.item);
  const checkIn = useSelector(state => state.checkIns.current);

  const handleMessage = useCallback(
    (ev: WebViewMessageEvent) => {
      const {current} = store.getState().checkIns;

      if (current == null) {
        console.warn('no checkIn available');
        return;
      }

      const message = parseProviderWebviewMessage(ev);
      const {key, value} = message;

      console.info('ProviderForm message:', message);

      switch (key) {
        case 'setProviderLogo': {
          if (value) {
            store.dispatch(providerSetLogoAction({item: current, logoUrl: value}));
          }
          break;
        }
        case 'checkInSuccess': {
          if (current.startTime == null) {
            store.dispatch(providerCheckInAction(current));
          } else {
            console.info('ProviderForm: skipping already checked in');
          }
          break;
        }
        case 'checkOutSuccess': {
          const {startTime} = current;

          if (startTime != null) {
            store.dispatch(providerCheckOutAction({...current, startTime, stopTime: Date.now()}));
          }

          NavigationService.fromProviderFormCheckout();
          break;
        }
        default: {
          console.info('ProviderForm: unhandled message', message);
          break;
        }
      }
    },
    [store]
  );

  if (!checkIn) {
    return null;
  }

  const injectedJavaScript = user ? prepareFillFormInWebViewInject({user, __DEV__}) : undefined;

  return (
    <Box flex={1} backgroundColor={theme.colors.surface}>
      <CachedWebView
        id={checkIn.id}
        url={checkIn.url}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
      />
    </Box>
  );
};

export default ProviderFormScreen;
