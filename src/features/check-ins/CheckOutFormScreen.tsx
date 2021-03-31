import React from 'react';
import {useNavigation} from '@react-navigation/core';

import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import {CheckInsRoutes} from 'src/features/check-ins/CheckInsNavigator';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';

const CheckOutFormScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const goCheckIn = () => navigate(CheckInsRoutes.MyCheckIns);

  return (
    <TopLevelView>
      <Headline>CheckOutFormScreen</Headline>
      <Button onPress={goCheckIn}>Checkout</Button>
    </TopLevelView>
  );
};

export default CheckOutFormScreen;
