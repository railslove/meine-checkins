import {useCallback, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';
import {BarCodeReadEvent} from 'react-native-camera';
import {useDispatch, useSelector} from 'react-redux';

import {TEST_PROVIDERS} from 'src/testData';
import {
  isTrustedProvider,
  PartialCheckInItem,
  TempProviderCheckIn,
} from 'src/shared/models/Provider';

import {
  providerStopAction,
  providersCleardAction,
  providerRegisterAction,
  providerScanQRAction,
} from 'src/shared/redux/actions/providerActions';
import NavigationService from 'src/features/navigation/services/NavigationService';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import QRScanner from 'src/shared/components/Form/QRCodeScanner';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import PermissionsService from 'src/shared/services/PermissionsService';

import ButtonLink from 'src/shared/components/Button/ButtonLink';
import NotQRScreen from 'src/features/scan/components/NotQRScreen';
import NotAuthorizedView from 'src/features/scan/components/NotAutorizedView';
import UserIsCheckedInScreen from 'src/features/scan/components/UserIsCheckedInScreen';
import UnsupportedCheckInScreen from './components/NotSupportedCheckInScreen';
import FlashlightIcon from 'src/shared/components/Icon/FlashlightIcon';
import DebugProvidersList from './DebugProvidersList';

export const SCAN_SCREEN_BACKGROUND_COLOR = 'rgba(18, 22, 32, 1)';

const ScanQRCodeScreen: React.FC = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const dispatch = useDispatch();

  const current = useSelector(state => state.checkIns.current);
  const isFocused = useIsFocused();

  const [isTorchOn, setTorchOn] = useState<boolean>();
  const [tempCheckIn, setTempCheckIn] = useState<TempProviderCheckIn>({});

  const handleToggleTorch = useCallback(() => {
    setTorchOn(!isTorchOn);
  }, [isTorchOn]);

  const handleResetTempCheckIn = useCallback(() => {
    setTempCheckIn({});
  }, []);

  const handleTestSubmit = (el: PartialCheckInItem) => () => {
    handleSuccess({data: el.url});
  };

  const handleClearProvidersData = useCallback(() => {
    dispatch(providersCleardAction());
  }, [dispatch]);

  const handleNavigateToProvider = useCallback(
    (url: string) => {
      setTempCheckIn({});
      // clear current provider => will also clear the webview
      dispatch(providerStopAction());

      // dispatch action with a bit of delay so the clear action takes place
      setTimeout(() => {
        dispatch(providerRegisterAction({url}));

        NavigationService.fromScanQRScreen();
      }, 125);
    },
    [dispatch]
  );

  const handleSuccess = ({data}: Pick<BarCodeReadEvent, 'data'>) => {
    const isTrusted = isTrustedProvider(data);
    const isQRCodeURL = /^https?\:/.test(data);
    const currentValue = {data, isTrusted, isQRCodeURL};

    setTempCheckIn(currentValue);

    dispatch(providerScanQRAction(currentValue));

    if (!isTrusted || !isQRCodeURL) {
      return;
    } else {
      handleNavigateToProvider(data);
    }
  };

  useEffect(() => {
    PermissionsService.requestCamera();
  });

  if (!isFocused) {
    return null;
  }

  if (tempCheckIn.isQRCodeURL === false) {
    return (
      <NotQRScreen
        backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
        onRetry={handleResetTempCheckIn}
      />
    );
  }

  if (tempCheckIn.data != null && tempCheckIn.isTrusted === false) {
    const nextQRUrl = tempCheckIn.data;

    const handleContinue = () => {
      handleNavigateToProvider(nextQRUrl);
    };

    return (
      <UnsupportedCheckInScreen
        backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
        onCancel={handleResetTempCheckIn}
        onContinue={handleContinue}
      />
    );
  }

  if (current) {
    const handleGoToCheckout = () => {
      NavigationService.fromScanQRScreen();
    };

    const handleDiscardCheckIn = () => {
      const title = t('checkInProgressTitle');
      const message = t('checkInProgressDiscardAlertMessage');

      Alert.alert(title, message, [
        {
          text: t('yes'),
          onPress: () => dispatch(providerStopAction()),
        },
        {
          text: t('no'),
        },
      ]);
    };

    return (
      <UserIsCheckedInScreen
        backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
        onGoToCheckOut={handleGoToCheckout}
        onDiscardCheckIn={handleDiscardCheckIn}
      />
    );
  }

  return (
    <TopLevelView
      display="flex"
      minHeight="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
    >
      <Box position="relative" width="100%">
        <Box top={20} right={0} position="absolute" opacity={isTorchOn ? 1 : 0.5}>
          <TouchableOpacity onPress={handleToggleTorch}>
            <FlashlightIcon />
          </TouchableOpacity>
        </Box>
      </Box>

      <Box marginHorizontal="10%" position="relative">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Space.V s={10} />
          <Title color="white">{t('title')}</Title>
          <Space.V s={10} />
        </Box>

        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <QRScanner
            isTorchOn={isTorchOn}
            backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
            notAuthorizedView={<NotAuthorizedView />}
            onRead={handleSuccess}
          />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Space.V s={10} />
          <Description color="white" textAlign="center">
            {t('description')}
          </Description>
          <Space.V s={10} />

          {__DEV__ ? (
            <DebugProvidersList onSubmit={handleTestSubmit} onClear={handleClearProvidersData} />
          ) : null}
        </Box>
      </Box>
    </TopLevelView>
  );
};

export default ScanQRCodeScreen;
