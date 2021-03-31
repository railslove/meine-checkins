import {useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';

import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';
import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import Description from 'src/shared/components/Typography/Description';
import Box from 'src/shared/components/Layout/Box';
import QRScanner from 'src/shared/components/Form/QRCodeScanner';
import {useDispatch, useSelector} from 'react-redux';
import {cameraPermissionSelector} from 'src/shared/redux/selectors/permissionsSelector';
import {requestCamerPermissionThunk} from 'src/shared/redux/effects/permissionThunks';
import {BarCodeReadEvent} from 'react-native-camera';
import {checkInRegsiterAction} from 'src/shared/redux/actions/checkInActions';

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
      <QRScanner
        reactivate
        reactivateTimeout={10000}
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
      <Button onPress={handleSubmit}>{t('submitScanQRCode')}</Button>
    </TopLevelView>
  );
};

export default ScanQRCodeScreen;
