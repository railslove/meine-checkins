import React from 'react';
import {useTranslation} from 'react-i18next';
import {Linking} from 'react-native';
import {useTheme} from 'react-native-paper';
import Button from 'src/shared/components/Button/Button';
import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Description from 'src/shared/components/Typography/Description';

const NotAuthorizedView = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const theme = useTheme();

  const handleGoToSettings = () => {
    Linking.openURL('app-settings:');
  };

  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderColor={theme.colors.error}
      borderWidth={1}
      borderRadius={theme.roundness}
    >
      <Description color="white">{t('cameraNotAuthorized')}</Description>
      <Space.V s={10} />
      <Button mode="text" onPress={handleGoToSettings}>
        {t('gotoAppSettings')}
      </Button>
    </Box>
  );
};

export default NotAuthorizedView;
