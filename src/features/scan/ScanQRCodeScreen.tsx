import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import {BarCodeReadEvent} from 'react-native-camera';
import React, {useEffect, useState} from 'react';

import Box from 'src/shared/components/Layout/Box';
import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import QRScanner from 'src/shared/components/Form/QRCodeScanner';
import Description from 'src/shared/components/Typography/Description';
import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {checkInStartAction} from 'src/shared/redux/actions/checkInActions';
import PermissionsService from 'src/shared/services/PermissionsService';

const ScanQRCodeScreen: React.FC = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

  const handleSubmit = () => {
    navigation.navigate(ScanRoutes.CheckInForm);
  };

  const handleSuccess = ({data: url}: BarCodeReadEvent) => {
    dispatch(checkInStartAction(url));
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
      <QRScanner
        reactivate
        reactivateTimeout={1000}
        topContent={
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box width="40%">
              <Headline color="white">{t('title')}</Headline>
            </Box>
          </Box>
        }
        bottomContent={
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box width="60%">
              <Description color="white">{t('description')}</Description>
            </Box>
          </Box>
        }
        onRead={handleSuccess}
      />
      <Button onPress={handleSubmit}>CheckIn</Button>
    </TopLevelView>
  );
};

export default ScanQRCodeScreen;
