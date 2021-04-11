import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MyCheckInsRoutes} from 'src/features/navigation/routes';

import FAQScreen from 'src/features/check-ins/FAQScreen';
import ImprintScreen from 'src/features/check-ins/ImprintScreen';
import MyCheckInsScreen from 'src/features/check-ins/MyCheckInsScreen';
import ProviderFormScreen from 'src/features/check-ins/ProviderFormScreen';

const {Navigator, Screen} = createStackNavigator<Record<MyCheckInsRoutes, any>>();

const CheckInsNavigator: React.FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={MyCheckInsRoutes.MyCheckIns} component={MyCheckInsScreen} />
      <Screen name={MyCheckInsRoutes.ProviderForm} component={ProviderFormScreen} />
      <Screen name={MyCheckInsRoutes.FAQ} component={FAQScreen} />
      <Screen name={MyCheckInsRoutes.Imprint} component={ImprintScreen} />
    </Navigator>
  );
};

export default CheckInsNavigator;
