import React from 'react';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomTabBar from 'src/features/navigation/components/BottomTabBar';
import {BottomTabsRoutes} from 'src/features/navigation/routes';

import ProfileScreen from 'src/features/profile/ProfileScreen';
import ScanQRCodeScreen from 'src/features/scan/ScanQRCodeScreen';
import CheckInsNavigator from 'src/features/navigation/CheckInsNavigator';

const {Navigator, Screen} = createBottomTabNavigator<Record<BottomTabsRoutes, any>>();

const BottomNavigator: React.FC = () => {
  const user = useSelector(state => state.user.item);
  const checkIns = useSelector(state => state.checkIns.items);

  const tabBarVisible = user != null;
  const initialRouteName =
    user == null
      ? BottomTabsRoutes.Profile
      : checkIns.length === 0
      ? BottomTabsRoutes.CheckInsNavigator
      : BottomTabsRoutes.ScanQRCode;

  return (
    <Navigator
      tabBar={BottomTabBar}
      screenOptions={{tabBarVisible}}
      initialRouteName={initialRouteName}
    >
      <Screen name={BottomTabsRoutes.Profile} component={ProfileScreen} />
      <Screen name={BottomTabsRoutes.ScanQRCode} component={ScanQRCodeScreen} />
      <Screen name={BottomTabsRoutes.CheckInsNavigator} component={CheckInsNavigator} />
    </Navigator>
  );
};

export default BottomNavigator;
