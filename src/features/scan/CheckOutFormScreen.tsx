import React from 'react';
import {useNavigation} from '@react-navigation/core';

import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import {CheckInsRoutes} from 'src/features/check-ins/CheckInsNavigator';
import ScreenContainer from 'src/shared/components/Screen/ScreenContainer';

const CheckOutFormScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const goCheckIn = () => navigate(CheckInsRoutes.MyCheckIns);

  return (
    <ScreenContainer>
      <Headline>CheckOutFormScreen</Headline>
      <Button onPress={goCheckIn}>Checkout</Button>
    </ScreenContainer>
  );
};

export default CheckOutFormScreen;
