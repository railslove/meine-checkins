import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';
import {BarCodeReadEvent} from 'react-native-camera';
import {useDispatch, useSelector} from 'react-redux';

import {TEST_PROVIDERS} from 'src/testData';
import {isTrustedProvider, PartialCheckInItem} from 'src/shared/models/Provider';

import {
  providerStopAction,
  providersCleardAction,
  providerRegisterAction,
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
import NotQRScreen from 'src/features/scan/NotQRScreen';
import NotAuthorizedView from 'src/features/scan/NotAutorizedView';
import UserIsCheckedInScreen from 'src/features/scan/UserIsCheckedInScreen';
import UnsupportedCheckInScreen from './NotSupportedCheckInScreen';

export const SCAN_SCREEN_BACKGROUND_COLOR = 'rgba(18, 22, 32, 1)';

export type TempProviderCheckIn = Partial<{
  url: string;
  isTrusted: boolean;
  isQRCodeURL: boolean;
}>;

const ScanQRCodeScreen: React.FC = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const dispatch = useDispatch();
  const current = useSelector(state => state.checkIns.current);
  const isFocused = useIsFocused();
  const [tempCheckIn, setTempCheckIn] = useState<TempProviderCheckIn>({});

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

  const handleSuccess = ({data: url}: Pick<BarCodeReadEvent, 'data'>) => {
    const isTrusted = isTrustedProvider(url);
    const isQRCodeURL = /^https?\:/.test(url);

    setTempCheckIn({url, isTrusted, isQRCodeURL});

    if (!isTrusted || !isQRCodeURL) {
      return;
    } else {
      handleNavigateToProvider(url);
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

  if (tempCheckIn.url != null && tempCheckIn.isTrusted === false) {
    const nextQRUrl = tempCheckIn.url;

    const handleContiue = () => {
      handleNavigateToProvider(nextQRUrl);
    };

    return (
      <UnsupportedCheckInScreen
        backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
        onCancel={handleResetTempCheckIn}
        onContinue={handleContiue}
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
      flex={1}
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
    >
      <Box marginHorizontal="10%">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Space.V s={10} />
          <Title color="white">{t('title')}</Title>
          <Space.V s={10} />
        </Box>

        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <QRScanner
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
            <>
              <Space.V s={10} />
              <Box display="flex" flexDirection="row" maxWidth="100%" flexWrap="wrap">
                {TEST_PROVIDERS.map(el => {
                  return (
                    <ButtonLink key={el.id} onPress={handleTestSubmit(el)}>
                      {'  ' + el.name + '  '}
                    </ButtonLink>
                  );
                })}
              </Box>
              <Space.V s={10} />
              <ButtonLink onPress={handleClearProvidersData}>CLEAR CHECKIN DATA</ButtonLink>
            </>
          ) : null}
        </Box>
      </Box>
    </TopLevelView>
  );
};

export default ScanQRCodeScreen;
