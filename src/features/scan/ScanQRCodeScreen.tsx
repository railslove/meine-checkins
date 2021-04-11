import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {BarCodeReadEvent} from 'react-native-camera';
import React, {useEffect, useState} from 'react';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Button from 'src/shared/components/Button/Button';
import QRScanner from 'src/shared/components/Form/QRCodeScanner';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import PermissionsService from 'src/shared/services/PermissionsService';
import {providerRegisterAction} from 'src/shared/redux/actions/providerActions';

import {TEST_PROVIDER} from 'src/testData';
import NavigationService from 'src/features/navigation/services/NavigationService';

const ScanQRCodeScreen: React.FC = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const dispatch = useDispatch();

  const checkIns = useSelector(state => state.checkIns);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

  const handleTestSubmit = () => {
    dispatch(providerRegisterAction(TEST_PROVIDER));
    NavigationService.fromScanQRScreen(checkIns);
  };

  const handleSuccess = ({data: checkInUrl}: BarCodeReadEvent) => {
    dispatch(providerRegisterAction({...TEST_PROVIDER, checkInUrl}));
    NavigationService.fromScanQRScreen(checkIns);
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
        <Button onPress={handleTestSubmit}>{t('submitScanQRCode')}</Button>
      </Box>
    </TopLevelView>
  );
};

export default ScanQRCodeScreen;
