import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigationState} from '@react-navigation/core';
import {createStackNavigator} from '@react-navigation/stack';

import {MyCheckInsRoutes} from 'src/features/navigation/routes';

import FAQScreen from 'src/features/check-ins/FAQScreen';
import ImprintScreen from 'src/features/check-ins/ImprintScreen';
import MyCheckInsScreen from 'src/features/check-ins/MyCheckInsScreen';
import ProviderFormScreen from 'src/features/check-ins/ProviderFormScreen';

const {Navigator, Screen} = createStackNavigator<Record<MyCheckInsRoutes, any>>();

const CheckInsNavigator: React.FC = () => {
  const {t} = useTranslation();
  const route = useNavigationState(state => {
    const r = state.routes[state.index];
    return r.state?.routes[r.state?.index || -1];
  });

  const headerShown =
    route?.name === MyCheckInsRoutes.FAQ || route?.name === MyCheckInsRoutes.Imprint;

  return (
    <Navigator screenOptions={{headerShown}}>
      <Screen
        name={MyCheckInsRoutes.MyCheckIns}
        options={{title: t('myCheckInsScreen:title')}}
        component={MyCheckInsScreen}
      />
      <Screen name={MyCheckInsRoutes.ProviderForm} component={ProviderFormScreen} />
      <Screen
        name={MyCheckInsRoutes.FAQ}
        options={{title: t('myCheckInsScreen:faq')}}
        component={FAQScreen}
      />
      <Screen
        name={MyCheckInsRoutes.Imprint}
        options={{title: t('myCheckInsScreen:imprint')}}
        component={ImprintScreen}
      />
    </Navigator>
  );
};

export default CheckInsNavigator;
