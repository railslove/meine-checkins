import React from 'react';
import {useNavigation} from '@react-navigation/core';

import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';
import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import ScreenContainer from 'src/shared/components/Screen/ScreenContainer';

const ScanQRCodeScreen: React.FC = () => {
  const navigation = useNavigation();

  const goCheckIn = () => navigation.navigate(ScanRoutes.CheckInForm);

  return (
    <ScreenContainer>
      <Headline>ScanQRCodeScreen</Headline>
      <Button onPress={goCheckIn}>CheckIn</Button>
    </ScreenContainer>
  );
};

export default ScanQRCodeScreen;
