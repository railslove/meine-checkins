import React from 'react';
import {useTranslation} from 'react-i18next';
import {StackActions, useNavigation} from '@react-navigation/core';

import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import {MainStackRoutes} from 'src/features/navigation/MainStackNavigator';
import ScreenContainer from 'src/shared/components/Screen/ScreenContainer';

const StartScreen: React.FC = () => {
  const {t} = useTranslation();

  const navigation = useNavigation();
  const goNext = () => {
    navigation.dispatch(StackActions.replace(MainStackRoutes.MainNavigation));
  };

  return (
    <ScreenContainer>
      <Headline>{t('startScreen:title')}</Headline>
      <Button onPress={goNext}>{t('base:letsGo')}</Button>
    </ScreenContainer>
  );
};

export default StartScreen;
