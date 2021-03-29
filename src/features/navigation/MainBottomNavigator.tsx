import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTabs} from 'src/features/navigation/constants';

import ProfileScreen from 'src/features/profile/ProfileScreen';
import MyCheckInsScreen from 'src/features/check-ins/MyCheckinsScreen';
import ScanQRCodeScreen from 'src/features/scan/ScanQRCodeScreen';

const {Navigator, Screen} = createBottomTabNavigator<Record<BottomTabs, any>>();

const MainBottomNavigator: React.FC = () => {
  return (
    <Navigator>
      <Screen name={BottomTabs.Profile} component={ProfileScreen} />
      <Screen name={BottomTabs.MyCheckIns} component={MyCheckInsScreen} />
      <Screen name={BottomTabs.ScanQRCode} component={ScanQRCodeScreen} />
    </Navigator>
  );
};

export default MainBottomNavigator;
