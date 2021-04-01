import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {CheckInsRoutes} from 'src/features/check-ins/CheckInsNavigator';
import Button from 'src/shared/components/Button/Button';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import Title from 'src/shared/components/Typography/Title';

const MyCheckInsScreen: React.FC = () => {
  const navigate = useNavigation();

  const goFAQ = () => navigate.navigate(CheckInsRoutes.FAQ);
  const goImpressum = () => navigate.navigate(CheckInsRoutes.Impressum);

  return (
    <TopLevelView>
      <Title>MyCheckInsScreen</Title>
      <Button onPress={goFAQ}>FAQ</Button>
      <Button onPress={goImpressum}>Impressum</Button>
    </TopLevelView>
  );
};

export default MyCheckInsScreen;
