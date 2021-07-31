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

export type NotQRScreenProps = {
  backgroundColor: string;
  onRetry: () => void;
};

const NotQRScreen: React.FC<NotQRScreenProps> = ({backgroundColor, onRetry}) => {
  const {t} = useTranslation('scanQRCodeScreen');

  return (
    <TopLevelView
      display="flex"
      flexDirection="column"
      paddingHorizontal={px2dp(30)}
      backgroundColor={backgroundColor}
    >
      <Space.V s={20} />
      <Box width="100%" flexDirection="row" alignItems="center" justifyContent="center">
        <Image
          style={{width: px2dp(200), height: px2dp(200)}}
          source={require('./img/try-again.png')}
        />
      </Box>
      <Box marginHorizontal="10%">
        <Title color="white" textAlign="center" split={false}>
          {t('QRIsNotAnURLTitle')}
        </Title>
        <Space.V s={15} />
        <SubTitle color="white" textAlign="center" lineHeight={18} fontWeight="bold">
          {t('QRIsNotAnURLMessage')}
        </SubTitle>
        <Space.V s={25} />
      </Box>

      <Button fullWidth={true} onPress={onRetry}>
        {t('QRIsNotAnURLButton')}
      </Button>
    </TopLevelView>
  );
};

export default NotQRScreen;
