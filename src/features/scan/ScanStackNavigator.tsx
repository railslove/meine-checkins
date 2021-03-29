import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ScanQRCodeScreen from 'src/features/scan/ScanQRCodeScreen';
import CheckInFormScreen from 'src/features/scan/CheckInFormScreen';
import CheckOutFormScreen from 'src/features/scan/CheckOutFormScreen';

export enum ScanRoutes {
  ScanQRCode = 'ScanQRCode',
  CheckInForm = 'CheckInForm',
  CheckOutForm = 'CheckOutForm',
}

const {Navigator, Screen} = createStackNavigator<Record<ScanRoutes, any>>();

const ScanStackNavigator: React.FC = () => {
  return (
    <Navigator>
      <Screen name={ScanRoutes.ScanQRCode} component={ScanQRCodeScreen} />
      <Screen name={ScanRoutes.CheckInForm} component={CheckInFormScreen} />
      <Screen name={ScanRoutes.CheckOutForm} component={CheckOutFormScreen} />
    </Navigator>
  );
};

export default ScanStackNavigator;
