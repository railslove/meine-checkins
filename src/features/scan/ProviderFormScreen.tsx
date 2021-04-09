import {ProgressBar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

import {
  providerCheckInAction,
  providerCheckOutAction,
} from 'src/shared/redux/actions/providerActions';

import {TEST_PROVIDER} from 'src/testData';
import {injectJSString} from 'src/features/scan/providerFormLib';
import {CheckInsRoutes} from 'src/features/check-ins/constants';
import {PROVIDER_SITE_MESSAGE} from 'src/features/scan/constants';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {useAppNavigation} from 'src/shared/hooks/navigationHooks';

const renderLoading = () => <ProgressBar indeterminate />;

const ProviderFormScreen: React.FC = () => {
  const {t} = useTranslation('providerFormScreen');

  const dispatch = useDispatch();
  const navigation = useAppNavigation();

  const user = useSelector(state => state.user.item);
  const provider = useSelector(state => state.checkIns.current || TEST_PROVIDER);

  const handleMessage = useCallback(
    (ev: WebViewMessageEvent) => {
      const {data: message} = ev.nativeEvent;
      console.log('message', message);

      if (message === PROVIDER_SITE_MESSAGE.checkInSuccess) {
        dispatch(providerCheckInAction(provider));
      } else if (message === PROVIDER_SITE_MESSAGE.checkOutSuccess) {
        dispatch(providerCheckOutAction(provider));
        navigation.navigate(CheckInsRoutes.MyCheckIns);
      }
    },
    [dispatch, navigation, provider]
  );

  if (!provider) {
    return (
      <TopLevelView>
        <Box display="flex" flex={1} alignItems="center" justifyContent="center">
          <Description>{t('missingProvider')}</Description>
        </Box>
      </TopLevelView>
    );
  }

  const injectedJavaScript = user ? injectJSString(user) : undefined;
  const uri = provider.stopTime ? provider.checkInUrl : provider.checkOutUrl;

  return (
    <Box flex={1}>
      <Space.V s={5} />
      <WebView
        source={{uri}}
        renderLoading={renderLoading}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
      />
    </Box>
  );
};

export default ProviderFormScreen;
