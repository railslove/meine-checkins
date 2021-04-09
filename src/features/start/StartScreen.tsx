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
      <Space.V s={10} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <LargeHeadline>{t('title')}</LargeHeadline>
      </Box>
      <Space.V s={15} />
      <Image source={require('./img/start-illustration.png')} />
      <Space.V s={-15} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Description textAlign="center">{t('description')}</Description>
      </Box>
      <Space.V s={15} />
      <Button onPress={handleSubmit}>{t('submit')}</Button>
    </TopLevelView>
  );
};

export default StartScreen;
