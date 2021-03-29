import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {CheckInsRoutes} from 'src/features/check-ins/CheckInsNavigator';
import Button from 'src/shared/components/Button/Button';
import ScreenContainer from 'src/shared/components/Screen/ScreenContainer';
import Headline from 'src/shared/components/Typography/Headline';

const MyCheckInsScreen: React.FC = () => {
  const navigate = useNavigation();

  const goFAQ = () => navigate.navigate(CheckInsRoutes.FAQ);
  const goImpressum = () => navigate.navigate(CheckInsRoutes.Impressum);

  return (
    <ScreenContainer>
      <Headline>MyCheckInsScreen</Headline>
      <Button onPress={goFAQ}>FAQ</Button>
      <Button onPress={goImpressum}>Impressum</Button>
    </ScreenContainer>
  );
};

export default MyCheckInsScreen;
