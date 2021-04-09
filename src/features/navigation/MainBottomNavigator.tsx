import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTabsRoutes} from 'src/features/navigation/constants';

import BottomTabBar from 'src/features/navigation/components/BottomTabBar';
import ProfileScreen from 'src/features/profile/ProfileScreen';
import CheckInsNavigator from 'src/features/check-ins/CheckInsNavigator';
import ScanStackNavigator from 'src/features/scan/ScanStackNavigator';

const {Navigator, Screen} = createBottomTabNavigator<Record<BottomTabsRoutes, any>>();

const MainBottomNavigator: React.FC = () => {
  return (
    <Navigator initialRouteName={BottomTabsRoutes.Profile} tabBar={BottomTabBar}>
      <Screen name={BottomTabsRoutes.Profile} component={ProfileScreen} />
      <Screen name={BottomTabsRoutes.ScanQRCode} component={ScanStackNavigator} />
      <Screen name={BottomTabsRoutes.MyCheckIns} component={CheckInsNavigator} />
    </Navigator>
  );
};

export default MainBottomNavigator;
