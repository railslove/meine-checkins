import {useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import React, {useCallback} from 'react';
import {WebViewMessageEvent} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';

import {
  providerCheckInAction,
  providerCheckOutAction,
  providerSetLogoAction,
} from 'src/shared/redux/actions/providerActions';

import {
  parseProviderWebviewMessage,
  prepareFillFormInWebViewInject,
} from 'src/features/check-ins/providerFormLib';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Button from 'src/shared/components/Button/Button';
import MemoWebview from 'src/shared/components/Webview/MemoWebview';
import NavigationService from 'src/features/navigation/services/NavigationService';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import Description from 'src/shared/components/Typography/Description';

const ProviderFormScreen: React.FC = () => {
  const {t} = useTranslation('providerFormScreen');
  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.item);
  const checkIn = useSelector(state => state.checkIns.current);

  const handleGoToScanQR = useCallback(() => {
    NavigationService.fromEmptyProviderForm();
  }, []);

  const handleMessage = useCallback(
    (ev: WebViewMessageEvent) => {
      if (checkIn == null) {
        console.warn('no checkIn available');
        return;
      }

      const message = parseProviderWebviewMessage(ev);
      const {key, value} = message;

      console.info('ProviderForm message:', message);

      switch (key) {
        case 'setProviderLogo': {
          dispatch(providerSetLogoAction({...checkIn, logoUrl: value}));
          break;
        }
        case 'checkInSuccess': {
          if (checkIn.startTime == null) {
            dispatch(providerCheckInAction(checkIn));
          } else {
            console.info('ProviderForm: skipping already checked in');
          }
          break;
        }
        case 'checkOutSuccess': {
          dispatch(providerCheckOutAction(checkIn));
          NavigationService.fromProviderFormCheckout();
          break;
        }
        default: {
          console.info('ProviderForm: unhandled message', message);
          break;
        }
      }
    },
    [dispatch, checkIn]
  );

  if (!checkIn) {
    return (
      <TopLevelView>
        <Space.V s={10} />
        <Title split={false}>{t('missingProviderTitle')}</Title>
        <Space.V s={10} />

        <Description>{t('missingProviderDescription')}</Description>
        <Space.V s={10} />
        <Button onPress={handleGoToScanQR}>{t('missingProviderSubmit')}</Button>
      </TopLevelView>
    );
  }

  const injectedJavaScript = user ? prepareFillFormInWebViewInject({user}) : undefined;

  return (
    <Box flex={1} backgroundColor={theme.colors.surface}>
      <MemoWebview
        id={checkIn.id}
        url={checkIn.url}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
      />
    </Box>
  );
};

export default ProviderFormScreen;
