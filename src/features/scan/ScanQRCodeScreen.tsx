import {useTranslation} from 'react-i18next';
import {BarCodeReadEvent} from 'react-native-camera';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';

import {TEST_PROVIDER} from 'src/testData';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Button from 'src/shared/components/Button/Button';
import QRScanner from 'src/shared/components/Form/QRCodeScanner';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import PermissionsService from 'src/shared/services/PermissionsService';
import {
  providerDiscardAction,
  providerRegisterAction,
} from 'src/shared/redux/actions/providerActions';

import SubTitle from 'src/shared/components/Typography/Subtitle';
import NavigationService from 'src/features/navigation/services/NavigationService';
import {toDpFromPixel} from 'src/shared/theme/util';

export const SCAN_SCREEN_BACKGROUND_COLOR = 'rgba(18, 22, 32, 1)';

const ScanQRCodeScreen: React.FC = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const dispatch = useDispatch();
  const currentProvider = useSelector(state => state.checkIns.current);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

  const handleTestSubmit = () => {
    handleSuccess({data: TEST_PROVIDER.url});
  };

  const handleSuccess = ({data: url}: Pick<BarCodeReadEvent, 'data'>) => {
    dispatch(providerRegisterAction({url}));
    NavigationService.fromScanQRScreen();
  };

  useEffect(() => {
    if (hasCameraPermission == null) {
      PermissionsService.requestCamera().then(({hasPermission}) => {
        setHasCameraPermission(hasPermission);
      });
    }
  });

  if (currentProvider) {
    const handleGoToCheckout = () => {
      NavigationService.fromScanQRScreen();
    };

    const handleDiscardCheckIn = () => {
      dispatch(providerDiscardAction());
    };

    return (
      <TopLevelView
        flex={1}
        display="flex"
        flexDirection="column"
        paddingHorizontal={toDpFromPixel(30)}
        backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
      >
        <Space.V s={40} />
        <Title color="white" split={false}>
          {t('checkInProgressTitle')}
        </Title>
        <Space.V s={15} />
        <SubTitle color="white">{t('checkInProgressSubTitle')}</SubTitle>
        <Space.V s={25} />

        <Button fullWidth={true} onPress={handleGoToCheckout}>
          {t('checkInProgressContinue')}
        </Button>

        <Space.V s={10} />
        <Button fullWidth={true} mode="text" onPress={handleDiscardCheckIn}>
          {t('checkInProgressDiscard')}
        </Button>
      </TopLevelView>
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
          <QRScanner onRead={handleSuccess} backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR} />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Space.V s={10} />
          <Description color="white" textAlign="center">
            {t('description')}
          </Description>
          <Space.V s={10} />

          {true ? (
            <>
              <Space.V s={10} />
              <Button onPress={handleTestSubmit}>{t('submitScanQRCode')}</Button>
              {/* space below for scroll tests */}
              <Space.V s={10} />
            </>
          ) : null}
        </Box>
      </Box>
    </TopLevelView>
  );
};

export default ScanQRCodeScreen;
