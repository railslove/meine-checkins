import {useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';
import {BarCodeReadEvent} from 'react-native-camera';
import {useDispatch, useSelector} from 'react-redux';

import Box from 'src/shared/components/Layout/Box';
import Title from 'src/shared/components/Typography/Title';
import Button from 'src/shared/components/Button/Button';
import QRScanner from 'src/shared/components/Form/QRCodeScanner';
import Description from 'src/shared/components/Typography/Description';
import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {checkInRegsiterAction} from 'src/shared/redux/actions/checkInActions';
import {cameraPermissionSelector} from 'src/shared/redux/selectors/permissionsSelector';
import {requestCamerPermissionThunk} from 'src/shared/redux/effects/permissionThunks';
import Space from 'src/shared/components/Layout/Space';

const ScanQRCodeScreen: React.FC = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const hasCameraPermission = useSelector(cameraPermissionSelector);

  const handleSubmit = () => {
    navigation.navigate(ScanRoutes.CheckInForm);
  };

  const handleSuccess = ({data: url}: BarCodeReadEvent) => {
    dispatch(checkInRegsiterAction(url));
    handleSubmit();
  };

  useEffect(() => {
    if (hasCameraPermission == null) {
      dispatch(requestCamerPermissionThunk());
    }
  }, [hasCameraPermission, dispatch]);

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
