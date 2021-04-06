import React from 'react';
import {CheckInsRoutes} from 'src/features/check-ins/CheckInsNavigator';
import Button from 'src/shared/components/Button/Button';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import Title from 'src/shared/components/Typography/Title';
import {useAppNavigation} from 'src/shared/hooks/navigationHooks';

const MyCheckInsScreen: React.FC = () => {
  const navigate = useAppNavigation();

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
