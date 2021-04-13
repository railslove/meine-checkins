import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ScanRoutes} from 'src/features/scan/constants';
import ScanQRCodeScreen from 'src/features/scan/ScanQRCodeScreen';
import ProviderFormScreen from 'src/features/scan/ProviderFormScreen';

const {Navigator, Screen} = createStackNavigator<Record<ScanRoutes, any>>();

const ScanStackNavigator: React.FC = () => {
  return (
    <Navigator key={ScanRoutes.key} screenOptions={{headerShown: true}}>
      <Screen name={ScanRoutes.ScanQRCode} component={ScanQRCodeScreen} />
      <Screen name={ScanRoutes.ProviderForm} component={ProviderFormScreen} />
    </Navigator>
  );
};

export default ScanStackNavigator;
