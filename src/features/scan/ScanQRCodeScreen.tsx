import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {BarCodeReadEvent} from 'react-native-camera';
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
import {providerRegisterAction} from 'src/shared/redux/actions/providerActions';

import SubTitle from 'src/shared/components/Typography/Subtitle';
import NavigationService from 'src/features/navigation/services/NavigationService';

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

  const handleGoToCheckout = () => {
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
    return (
      <TopLevelView flex={1} display="flex" flexDirection="column">
        <Space.V s={10} />
        <Title split={false}>{t('title')}</Title>
        <Space.V s={10} />
        <SubTitle>{t('checkInProgress')}</SubTitle>
        <Space.V s={10} />

        <Box display="flex" flex={1}>
          <Description>{t('checkInProgressDescription')}</Description>

          <Space.V s={10} />
          <Button onPress={handleGoToCheckout}>{t('checkInGoToCheckout')}</Button>
          {/* space below for scroll tests */}
          <Space.V s={10} />
        </Box>
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
      backgroundColor="black"
    >
      <Box marginHorizontal="10%">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Space.V s={10} />
          <Title color="white">{t('title')}</Title>
          <Space.V s={10} />
        </Box>

        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <QRScanner onRead={handleSuccess} />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Space.V s={10} />
          <Box width="85%">
            <Description color="white" textAlign="center">
              {t('description')}
            </Description>
            <Space.V s={10} />
          </Box>

          {__DEV__ ? (
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
