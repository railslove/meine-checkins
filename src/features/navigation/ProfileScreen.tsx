import React from 'react';
import {useNavigation} from '@react-navigation/core';
import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const goNext = () => navigation.navigate(ScanRoutes.ScanQRCode);

  return (
    <TopLevelView>
      <Headline>ProfileScreen</Headline>
      <Button onPress={goNext}>save</Button>
    </TopLevelView>
  );
};

export default ProfileScreen;
