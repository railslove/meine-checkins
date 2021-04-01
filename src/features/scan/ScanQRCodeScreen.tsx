import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import {BarCodeReadEvent} from 'react-native-camera';
import React, {useEffect, useState} from 'react';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Button from 'src/shared/components/Button/Button';
import QRScanner from 'src/shared/components/Form/QRCodeScanner';
import Description from 'src/shared/components/Typography/Description';
import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import PermissionsService from 'src/shared/services/PermissionsService';
import {supplierRegisterAction} from 'src/shared/redux/actions/supplierActions';

const ScanQRCodeScreen: React.FC = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

  const handleSubmit = () => {
    navigation.navigate(ScanRoutes.ProviderForm);
  };

  const handleSuccess = ({data: url}: BarCodeReadEvent) => {
    console.log('qr url', url);
    dispatch(supplierRegisterAction(url));
    handleSubmit();
  };

  useEffect(() => {
    if (hasCameraPermission == null) {
      PermissionsService.requestCamera().then(({hasPermission}) => {
        setHasCameraPermission(hasPermission);
      });
    }
  });

  return (
    <TopLevelView backgroundColor="black">
      <Box flex={1} display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Title color="white">{t('title')}</Title>
        </Box>
        <Space.V s={10} />
        <Box display="flex" alignItems="center" justifyContent="center">
          <QRScanner onRead={handleSuccess} />
        </Box>
        <Space.V s={10} />
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box width="85%">
            <Description color="white" textAlign="center">
              {t('description')}
            </Description>
          </Box>
        </Box>
        <Space.V s={10} />
        <Button onPress={handleSubmit}>{t('submitScanQRCode')}</Button>
      </Box>
    </TopLevelView>
  );
};

export default ScanQRCodeScreen;
