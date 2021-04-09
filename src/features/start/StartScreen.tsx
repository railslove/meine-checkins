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
