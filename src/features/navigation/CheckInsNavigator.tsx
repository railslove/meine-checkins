import React from 'react';
import {useTranslation} from 'react-i18next';
import {createStackNavigator} from '@react-navigation/stack';

import {MyCheckInsRoutes} from 'src/features/navigation/routes';

import FAQScreen from 'src/features/check-ins/FAQScreen';
import MyCheckInsScreen from 'src/features/check-ins/MyCheckInsScreen';
import ProviderFormScreen from 'src/features/check-ins/ProviderFormScreen';
import ImprintScreen from 'src/features/check-ins/ImprintScreen';

const {Navigator, Screen} = createStackNavigator<Record<MyCheckInsRoutes, any>>();

const CheckInsNavigator: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Navigator screenOptions={{title: '', headerShown: false}}>
      <Screen
        name={MyCheckInsRoutes.MyCheckIns}
        options={{title: t('myCheckInsScreen:title')}}
        component={MyCheckInsScreen}
      />
      <Screen name={MyCheckInsRoutes.ProviderForm} component={ProviderFormScreen} />
      <Screen
        name={MyCheckInsRoutes.FAQ}
        options={{title: '', headerShown: true}}
        component={FAQScreen}
      />
      <Screen
        name={MyCheckInsRoutes.Imprint}
        options={{title: '', headerShown: true}}
        component={ImprintScreen}
      />
    </Navigator>
  );
};

export default CheckInsNavigator;
