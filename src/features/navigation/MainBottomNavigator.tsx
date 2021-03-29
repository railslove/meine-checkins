import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfileScreen from 'src/features/navigation/ProfileScreen';
import CheckInsNavigator from 'src/features/check-ins/CheckInsNavigator';
import ScanStackNavigator from 'src/features/scan/ScanStackNavigator';

export enum BottomTabsRoutes {
  Profile = 'Profile',
  ScanQRCode = 'ScanQRCode',
  MyCheckIns = 'MyCheckIns',
}

const {Navigator, Screen} = createBottomTabNavigator<Record<BottomTabsRoutes, any>>();

const MainBottomNavigator: React.FC = () => {
  return (
    <Navigator>
      <Screen name={BottomTabsRoutes.Profile} component={ProfileScreen} />
      <Screen name={BottomTabsRoutes.ScanQRCode} component={ScanStackNavigator} />
      <Screen name={BottomTabsRoutes.MyCheckIns} component={CheckInsNavigator} />
    </Navigator>
  );
};

export default MainBottomNavigator;
