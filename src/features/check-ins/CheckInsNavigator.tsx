import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FAQScreen from 'src/features/check-ins/FAQScreen';
import MyCheckInsScreen from 'src/features/check-ins/MyCheckInsScreen';
import {CheckInsRoutes} from 'src/features/check-ins/constants';

const {Navigator, Screen} = createStackNavigator<Record<CheckInsRoutes, any>>();

const CheckInsNavigator: React.FC = () => {
  return (
    <Navigator key={CheckInsRoutes.key} screenOptions={{headerShown: false}}>
      <Screen name={CheckInsRoutes.MyCheckIns} component={MyCheckInsScreen} />
      <Screen name={CheckInsRoutes.FAQ} component={FAQScreen} />
    </Navigator>
  );
};

export default CheckInsNavigator;
