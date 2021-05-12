import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import React, {useCallback} from 'react';
import {WebViewMessageEvent} from 'react-native-webview';

import {
  providerCheckInAction,
  providerSetLogoAction,
  providerCheckOutAction,
  providerSetLocationAction,
} from 'src/shared/redux/actions/providerActions';

import {
  parseProviderWebviewMessage,
  prepareFillFormInWebViewInject,
} from 'src/features/check-ins/providerFormLib';

import NavigationService from 'src/features/navigation/services/NavigationService';

import Box from 'src/shared/components/Layout/Box';
import CachedWebView from 'src/shared/components/WebView/CachedWebView';

const ProviderFormScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.item);
  const checkIn = useSelector(state => state.checkIns.current);

  const handleMessage = useCallback(
    (ev: WebViewMessageEvent) => {
      const current = checkIn;

      if (current == null) {
        console.warn('there is no check-in in progress');
        return;
      }

      const message = parseProviderWebviewMessage(ev);
      const {key, value} = message;

      console.info('ProviderForm message:', message);

      switch (key) {
        case 'setLogo': {
          if (value && current.logoUrl == null) {
            dispatch(providerSetLogoAction({item: current, logoUrl: value}));
          }
          break;
        }
        case 'setLocation': {
          if (value && current.location == null) {
            dispatch(providerSetLocationAction({item: current, location: value}));
          }
          break;
        }
        case 'checkInSuccess': {
          if (current.startTime == null) {
            dispatch(providerCheckInAction(current));
          } else {
            console.warn('tried to check-in with startTime');
          }
          break;
        }
        case 'checkOutSuccess': {
          const {startTime} = current;

          if (startTime != null) {
            dispatch(providerCheckOutAction({...current, startTime}));
          } else {
            console.warn('tried to check-out without startTime');
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
    [checkIn, dispatch]
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
