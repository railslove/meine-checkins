import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FAQScreen from 'src/features/check-ins/FAQScreen';
import ImpressumScreen from 'src/features/check-ins/ImpressumScreen';
import MyCheckInsScreen from 'src/features/check-ins/MyCheckinsScreen';

export enum MyCheckInsStack {
  FAQ = 'FAQ',
  Impressum = 'Impressum',
  MyCheckIn = 'MyCheckIn',
}

const {Navigator, Screen} = createStackNavigator<Record<MyCheckInsStack, any>>();

const CheckInsNavigator: React.FC = () => {
  return (
    <Navigator>
      <Screen name={MyCheckInsStack.MyCheckIn} component={MyCheckInsScreen} />
      <Screen name={MyCheckInsStack.FAQ} component={FAQScreen} />
      <Screen name={MyCheckInsStack.Impressum} component={ImpressumScreen} />
    </Navigator>
  );
};

export default CheckInsNavigator;
