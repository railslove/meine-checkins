import {useTranslation} from 'react-i18next';
import React, {useCallback} from 'react';
import {ProgressBar, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

import {
  supplierCheckInAction,
  supplierCheckOutAction,
} from 'src/shared/redux/actions/supplierActions';

import {injectJSString} from 'src/features/scan/providerFormLib';
import {TEST_PROVIDER, PROVIDER_SITE_MESSAGE} from 'src/features/scan/constants';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {CheckInsRoutes} from 'src/features/check-ins/CheckInsNavigator';
import {useAppNavigation} from 'src/shared/hooks/navigationHooks';

const ProviderFormScreen: React.FC = () => {
  const {t} = useTranslation('providerFormScreen');
  const theme = useTheme();

  const dispatch = useDispatch();
  const navigation = useAppNavigation();

  const user = useSelector(state => state.user.item);
  const provider = useSelector(state => {
    return state.checkIns.current || TEST_PROVIDER;
  });

  const onMessage = useCallback(
    (ev: WebViewMessageEvent) => {
      const message = ev.nativeEvent.data;

      if (message === PROVIDER_SITE_MESSAGE.checkInSuccess) {
        dispatch(supplierCheckInAction(provider));
      } else if (message === PROVIDER_SITE_MESSAGE.checkOutSuccess) {
        dispatch(supplierCheckOutAction(provider));
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

  return (
    <Box flex={1}>
      <Space.V s={5} />
      <WebView
        source={{uri: provider.url}}
        renderLoading={() => <ProgressBar indeterminate color={theme.colors.primary} />}
        injectedJavaScript={user ? injectJSString(user) : undefined}
        onMessage={onMessage}
      />
    </Box>
  );
};

export default ProviderFormScreen;