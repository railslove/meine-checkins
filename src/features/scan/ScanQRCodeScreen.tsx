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

const ScanQRCodeScreen: React.FC = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const hasCameraPermission = useSelector(cameraPermissionSelector);

  const handleSubmit = () => navigation.navigate(ScanRoutes.CheckInForm);
  const handleSuccess = (value: any) => console.log('qr scan success', value);

  useEffect(() => {
    if (hasCameraPermission == null) {
      dispatch(requestCamerPermissionThunk());
    }
  }, [hasCameraPermission, dispatch]);

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
