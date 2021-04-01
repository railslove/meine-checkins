import {StackActions} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

import User from 'src/shared/models/User';

import {
  supplierCheckInAction,
  supplierCheckOutAction,
} from 'src/shared/redux/actions/supplierActions';

import Box from 'src/shared/components/Layout/Box';
import {CheckInsRoutes} from 'src/features/check-ins/CheckInsNavigator';
import {useAppNavigation} from 'src/shared/hooks/navigationHooks';

enum ProviderSiteMessage {
  checkInSuccess = 'CheckInSuccess',
  checkInFailure = 'CheckInFailure',
  checkOutSuccess = 'CheckOutSuccess',
  checkOutFailure = 'CheckOutFailure',
}

const INJECTED_JAVASCRIPT = (user: User) => `(function() {
  const inputs = Array.from(document.body.querySelectorAll('input[name]'));
  const submit = document.body.querySelector('button[type=submit]');

  function isCheckIn() {
    return /check-in/i.test(submit.innerText);
  }

  function isCheckOut() {
    return /check-out/i.test(submit.innerText);
  }

  function checkIn() {
    const user = ${JSON.stringify(user)};
    const keys = Object.keys(user);

    const filled = inputs
      .map(el => {
        const name = el.name;
        const value = user[name];
        if (value) {
          el.focus();
          el.value = value;
          return [name, value];
        }
        return null;
      })
      .filter(v => v)
    ;

    const wasFillSuccess = filled.length === Object.keys(user).length;

    if (wasFillSuccess) {
      submit.click();
      window.ReactNativeWebView.postMessage("${ProviderSiteMessage.checkInSuccess}");
    } else {
      window.ReactNativeWebView.postMessage("${ProviderSiteMessage.checkInFailure}");
    }
  }

  function checkOut() {
    window.ReactNativeWebView.postMessage("${ProviderSiteMessage.checkOutSuccess}");
    submit.removeEventListener('click', checkOut);
  }

  try {
    setTimeout(() => {
      if (isCheckIn()) {
        checkIn();
        window.ReactNativeWebView.postMessage('setup listener for check-out');
        submit.addEventListener('click', checkOut);
      }
    }, 1000);
  } catch (error) {
    window.ReactNativeWebView.postMessage(error);
  }
})();`;

const uri = 'https://check-in-provider.vercel.app';

const ProviderFormScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useAppNavigation();

  const user = useSelector(state => state.user.item);

  const onMessage = useCallback(
    (ev: WebViewMessageEvent) => {
      const message = ev.nativeEvent.data;

      console.log('message', message);

      if (message === ProviderSiteMessage.checkInSuccess) {
        console.log('check-in success');
        dispatch(supplierCheckInAction(uri));
      } else if (message === ProviderSiteMessage.checkOutSuccess) {
        console.log('check-out success');
        dispatch(supplierCheckOutAction(uri));
        navigation.navigate(CheckInsRoutes.MyCheckIns);
      } else {
        console.log('no another action taken');
      }
    },
    [dispatch, navigation]
  );

  return (
    <Box flex={1}>
      <WebView
        source={{uri}}
        injectedJavaScript={user ? INJECTED_JAVASCRIPT(user) : undefined}
        onMessage={onMessage}
      />
    </Box>
  );
};

export default ProviderFormScreen;
