import React from 'react';
import {useNavigation} from '@react-navigation/core';

import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';
import Headline from 'src/shared/components/Typography/Headline';
import Button from 'src/shared/components/Button/Button';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {useSelector} from 'react-redux';
import {Text} from 'react-native';

const CheckInFormScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const goCheckIn = () => navigate(ScanRoutes.CheckOutForm);
  const checkIns = useSelector(state => state.checkIns.items);

  return (
    <TopLevelView>
      <Headline>CheckInFormScreen</Headline>
      <Text>{JSON.stringify(checkIns, null, 2)}</Text>
      <Button onPress={goCheckIn}>CheckOut</Button>
    </TopLevelView>
  );
};

export default CheckInFormScreen;
