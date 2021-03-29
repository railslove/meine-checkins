import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FAQScreen from 'src/features/check-ins/FAQScreen';
import ImpressumScreen from 'src/features/check-ins/ImpressumScreen';
import MyCheckInsScreen from 'src/features/check-ins/MyCheckinsScreen';

export enum CheckInsRoutes {
  FAQ = 'FAQ',
  Impressum = 'Impressum',
  MyCheckIns = 'MyCheckIns',
}

const {Navigator, Screen} = createStackNavigator<Record<CheckInsRoutes, any>>();

const CheckInsNavigator: React.FC = () => {
  return (
    <Navigator>
      <Screen name={CheckInsRoutes.MyCheckIns} component={MyCheckInsScreen} />
      <Screen name={CheckInsRoutes.FAQ} component={FAQScreen} />
      <Screen name={CheckInsRoutes.Impressum} component={ImpressumScreen} />
    </Navigator>
  );
};

export default CheckInsNavigator;
