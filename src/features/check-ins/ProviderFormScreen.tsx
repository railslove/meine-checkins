import {ProgressBar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

import {
  providerCheckInAction,
  providerCheckOutAction,
} from 'src/shared/redux/actions/providerActions';

import {PROVIDER_SITE_MESSAGE} from 'src/features/scan/constants';
import {prepareFillFormInWebViewInject} from 'src/features/check-ins/providerFormLib';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import NavigationService from 'src/features/navigation/services/NavigationService';

const renderLoading = () => <ProgressBar indeterminate />;

const ProviderFormScreen: React.FC = () => {
  const {t} = useTranslation('providerFormScreen');

  const dispatch = useDispatch();

  const user = useSelector(state => state.user.item);
  const provider = useSelector(state => state.checkIns.current);

  const handleMessage = useCallback(
    (ev: WebViewMessageEvent) => {
      const {data: message} = ev.nativeEvent;

      if (provider == null) {
        console.warn('no provider available');
        return;
      }

      if (message === PROVIDER_SITE_MESSAGE.checkInSuccess) {
        dispatch(providerCheckInAction(provider));
      } else if (message === PROVIDER_SITE_MESSAGE.checkOutSuccess) {
        dispatch(providerCheckOutAction(provider));
        NavigationService.fromProfileFormCheckout();
      }
    },
    [dispatch, provider]
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

  const injectedJavaScript = user
    ? prepareFillFormInWebViewInject(user, provider.startTime != null)
    : undefined;
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
