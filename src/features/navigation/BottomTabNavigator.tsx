import React from 'react';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomTabBar from 'src/features/navigation/components/BottomTabBar';
import {BottomTabsRoutes} from 'src/features/navigation/routes';

import ProfileScreen from 'src/features/profile/ProfileScreen';
import ScanQRCodeScreen from 'src/features/scan/ScanQRCodeScreen';
import CheckInsNavigator from 'src/features/navigation/CheckInsNavigator';

const {Navigator, Screen} = createBottomTabNavigator<Record<BottomTabsRoutes, any>>();

const MainBottomNavigator: React.FC = () => {
  const user = useSelector(state => state.user.item);
  const {current: provider, items: checkIns} = useSelector(state => state.checkIns);

  const tabBarVisible = user != null && (provider?.startTime != null || checkIns.length > 0);
  const initialRouteName = user == null ? BottomTabsRoutes.Profile : BottomTabsRoutes.ScanQRCode;

  return (
    <Navigator
      tabBar={BottomTabBar}
      screenOptions={{tabBarVisible}}
      initialRouteName={initialRouteName}
    >
      <Screen name={BottomTabsRoutes.Profile} component={ProfileScreen} />
      <Screen name={BottomTabsRoutes.ScanQRCode} component={ScanQRCodeScreen} />
      <Screen name={BottomTabsRoutes.MyCheckIns} component={CheckInsNavigator} />
    </Navigator>
  );
};

export default MainBottomNavigator;
