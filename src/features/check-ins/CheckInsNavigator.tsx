import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FAQScreen from 'src/features/check-ins/FAQScreen';
import ImprintScreen from 'src/features/check-ins/ImprintScreen';
import MyCheckInsScreen from 'src/features/check-ins/MyCheckInsScreen';

export enum CheckInsRoutes {
  key = 'CheckInsRoutesKey',
  FAQ = 'FAQ',
  Imprint = 'Imprint',
  MyCheckIns = 'MyCheckIns',
}

const {Navigator, Screen} = createStackNavigator<Record<CheckInsRoutes, any>>();

const CheckInsNavigator: React.FC = () => {
  return (
    <Navigator key={CheckInsRoutes.key} screenOptions={{headerShown: false}}>
      <Screen name={CheckInsRoutes.MyCheckIns} component={MyCheckInsScreen} />
      <Screen name={CheckInsRoutes.FAQ} component={FAQScreen} />
      <Screen name={CheckInsRoutes.Imprint} component={ImprintScreen} />
    </Navigator>
  );
};

export default CheckInsNavigator;
