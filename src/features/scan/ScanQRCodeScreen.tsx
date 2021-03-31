import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import {PERMISSIONS, request} from 'react-native-permissions';

import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';
import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import Description from 'src/shared/components/Typography/Description';
import {Platform} from 'react-native';
import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import QRScanner from 'src/shared/components/Form/QRCodeScanner';

const ScanQRCodeScreen: React.FC = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const navigation = useNavigation();
  const [hasCameraPermission, setCameraPermission] = useState<boolean>();

  const handleSubmit = () => navigation.navigate(ScanRoutes.CheckInForm);
  const handleSuccess = (value: any) => console.log(value);

  useEffect(() => {
    if (hasCameraPermission == null) {
      const value = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
      request(value).then(result => {
        console.log('hasCameraPermission', hasCameraPermission);
        setCameraPermission(result === 'granted');
      });
    }
  }, [hasCameraPermission]);

  console.log('hasCameraPermission', hasCameraPermission);

  return (
    <TopLevelView backgroundColor="black">
      <QRScanner
        topContent={
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box width="40%">
              <Headline color="white">{t('title')}</Headline>
            </Box>
          </Box>
        }
        onRead={handleSuccess}
        bottomContent={
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box width="60%">
              <Description color="white">{t('description')}</Description>
            </Box>
          </Box>
        }
      />
      <Button onPress={handleSubmit}>CheckIn</Button>
    </TopLevelView>
  );
};

export default ScanQRCodeScreen;
