import React from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Image from 'src/shared/components/Image/Image';
import Button from 'src/shared/components/Button/Button';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import LargeHeadline from 'src/shared/components/Typography/LargeTitle';
import NavigationService from 'src/features/navigation/services/NavigationService';

const StartScreen: React.FC = () => {
  const {t} = useTranslation('startScreen');
  const user = useSelector(state => state.user.item);

  const handleSubmit = () => {
    NavigationService.fromStartScreen(user);
  };

  return (
    <TopLevelView>
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <Space.V s={10} />
        <LargeHeadline>{t('title')}</LargeHeadline>
        <Image source={require('./img/start-illustration.png')} resizeMode="contain" />
        <Box marginHorizontal="10%" display="flex" alignItems="center" justifyContent="center">
          <Space.V s={10} />
          <Description textAlign="center">{t('description')}</Description>
          <Space.V s={10} />
          <Button onPress={handleSubmit}>{t('submit')}</Button>
        </Box>
      </Box>
    </TopLevelView>
  );
};

export default StartScreen;
