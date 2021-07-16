import React from 'react';
import {useTranslation} from 'react-i18next';

import {px2dp} from 'src/shared/styles/createStyles';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Image from 'src/shared/components/Image/Image';
import Button from 'src/shared/components/Button/Button';
import SubTitle from 'src/shared/components/Typography/Subtitle';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';

export type NotSupportedCheckInScreenProps = {
  backgroundColor: string;
  onCancel: () => void;
  onContinue: () => void;
};

const NotSupportedCheckInScreen: React.FC<NotSupportedCheckInScreenProps> = ({
  backgroundColor,
  onCancel,
  onContinue,
}) => {
  const {t} = useTranslation('scanQRCodeScreen');

  const title = t('checkInProviderNotSupportedYetTitle');
  const message = t('checkInProviderNotSupportedYetMessage');

  return (
    <TopLevelView
      flex={1}
      display="flex"
      flexDirection="column"
      paddingHorizontal={px2dp(30)}
      backgroundColor={backgroundColor}
    >
      <Space.V s={15} />
      <Box width="100%" flexDirection="row" alignItems="center" justifyContent="center">
        <Image
          style={{width: px2dp(200), height: px2dp(150)}}
          source={require('./img/try-again.png')}
        />
      </Box>
      <Box marginHorizontal="5%">
        <Space.V s={15} />
        <Title color="white" textAlign="center" split={false}>
          {title}
        </Title>
        <Space.V s={15} />
        <SubTitle color="white" textAlign="center" lineHeight={22}>
          {message}
        </SubTitle>
      </Box>

      <Space.V s={15} />

      <Button fullWidth={true} onPress={onContinue}>
        {t('continue')}
      </Button>

      <Space.V s={10} />

      <Button fullWidth={true} mode="outlined" onPress={onCancel}>
        {t('cancel')}
      </Button>
    </TopLevelView>
  );
};

export default NotSupportedCheckInScreen;
