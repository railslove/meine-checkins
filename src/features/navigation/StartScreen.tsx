import React from 'react';
import {StackActions, useNavigation} from '@react-navigation/core';

import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import {MainStackRoutes} from 'src/features/navigation/MainStackNavigator';
import ScreenContainer from 'src/shared/components/Screen/ScreenContainer';

const StartScreen: React.FC = () => {
  const navigation = useNavigation();
  const goNext = () => {
    navigation.dispatch(StackActions.replace(MainStackRoutes.MainNavigation));
  };

  return (
    <ScreenContainer>
      <Headline>StartScreen</Headline>
      <Button onPress={goNext}>Profile</Button>
    </ScreenContainer>
  );
};

export default StartScreen;
