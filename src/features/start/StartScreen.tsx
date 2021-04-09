import React from 'react';
import {useTranslation} from 'react-i18next';
import {StackActions} from '@react-navigation/core';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Image from 'src/shared/components/Image/Image';
import Button from 'src/shared/components/Button/Button';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import LargeHeadline from 'src/shared/components/Typography/LargeTitle';
import {useAppNavigation} from 'src/shared/hooks/navigationHooks';
import {MainStackRoutes} from 'src/features/navigation/constants';

const StartScreen: React.FC = () => {
  const {t} = useTranslation('startScreen');
  const navigation = useAppNavigation();

  const handleSubmit = () => {
    navigation.dispatch(StackActions.replace(MainStackRoutes.MainNavigation));
  };

  return (
    <TopLevelView>
      <Box marginHorizontal="10%" display="flex" alignItems="center" justifyContent="center">
        <Space.V s={5} />
        <LargeHeadline>{t('title')}</LargeHeadline>
        <Space.V s={5} />
      </Box>
      <Box marginHorizontal="5%" height="45%">
        <Image source={require('./img/start-illustration.png')} resizeMode="contain" />
      </Box>
      <Box marginHorizontal="10%" display="flex" alignItems="center" justifyContent="center">
        <Description textAlign="center">{t('description')}</Description>
        <Space.V s={10} />
        <Button onPress={handleSubmit}>{t('submit')}</Button>
      </Box>
    </TopLevelView>
  );
};

export default StartScreen;
