import React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import Box from 'src/shared/components/Layout/Box';
import Description from 'src/shared/components/Typography/Description';

const NotAuthorizedView = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const theme = useTheme();

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
    </Box>
  );
};

export default NotAuthorizedView;
