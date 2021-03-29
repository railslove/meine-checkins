import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ScanQRCodeScreen from 'src/features/scan/ScanQRCodeScreen';
import CheckInFormScreen from 'src/features/scan/CheckInFormScreen';
import CheckOutFormScreen from 'src/features/scan/CheckOutFormScreen';

export enum ScanQRCodeStack {
  ScanQRCode = 'ScanQRCode',
  CheckInForm = 'CheckInForm',
  CheckOutForm = 'CheckOutForm',
}

const {Navigator, Screen} = createStackNavigator<Record<ScanQRCodeStack, any>>();

const StartStackNavigation: React.FC = () => {
  return (
    <Navigator>
      <Screen name={ScanQRCodeStack.ScanQRCode} component={ScanQRCodeScreen} />
      <Screen name={ScanQRCodeStack.CheckInForm} component={CheckInFormScreen} />
      <Screen name={ScanQRCodeStack.CheckOutForm} component={CheckOutFormScreen} />
    </Navigator>
  );
};

export default StartStackNavigation;
