import React from 'react';
import {useNavigation} from '@react-navigation/core';
import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import ScreenContainer from 'src/shared/components/Screen/ScreenContainer';
import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const goNext = () => navigation.navigate(ScanRoutes.ScanQRCode);

  return (
    <ScreenContainer>
      <Headline>ProfileScreen</Headline>
      <Button onPress={goNext}>save</Button>
    </ScreenContainer>
  );
};

export default ProfileScreen;
