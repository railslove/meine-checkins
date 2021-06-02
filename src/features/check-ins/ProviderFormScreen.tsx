import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useState, useRef} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import WebView, {WebViewMessageEvent, WebViewNavigation} from 'react-native-webview';

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
import ArrowRightIcon from 'src/shared/components/Icon/ArrowRightIcon';
import ArrowLeftIcon from 'src/shared/components/Icon/ArrowLeftIcon';

const ProviderFormScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const webviewRef = useRef<WebView>(null);

  const user = useSelector(state => state.user.item);
  const checkIn = useSelector(state => state.checkIns.current);
  const [canGoBack, setCanGoBack] = useState<boolean>();
  const [canGoForward, setCanGoForward] = useState<boolean>();

  const {current: browserWindow} = webviewRef;

  const handleGoBack = useCallback(() => {
    if (!browserWindow || !canGoBack) {
      return null;
    }

    browserWindow.goBack();
  }, [canGoBack, browserWindow]);

  const handleGoForward = useCallback(() => {
    if (!browserWindow || !canGoForward) {
      return null;
    }

    browserWindow.goForward();
  }, [canGoForward, browserWindow]);

  const handleNavigationStateChange = useCallback((ev: WebViewNavigation) => {
    setCanGoBack(ev.canGoBack);
    setCanGoForward(ev.canGoForward);
  }, []);

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
    <SafeAreaView style={{flex: 1}}>
      <Box flex={1} backgroundColor={theme.colors.surface} flexDirection="column">
        {canGoBack || canGoForward ? (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-end"
            justifyContent="space-between"
            paddingVertical={10}
            paddingHorizontal={15}
          >
            {canGoBack ? (
              <TouchableOpacity onPress={handleGoBack}>
                <ArrowLeftIcon />
              </TouchableOpacity>
            ) : (
              <Box />
            )}

            {canGoForward ? (
              <TouchableOpacity onPress={handleGoForward}>
                <ArrowRightIcon />
              </TouchableOpacity>
            ) : (
              <Box />
            )}
          </Box>
        ) : null}
        <CachedWebView
          id={checkIn.id}
          url={checkIn.url}
          ref={webviewRef}
          injectedJavaScript={injectedJavaScript}
          onMessage={handleMessage}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </Box>
    </SafeAreaView>
  );
};

export default ProviderFormScreen;
