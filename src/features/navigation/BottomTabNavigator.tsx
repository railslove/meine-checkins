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
  const provider = useSelector(state => state.checkIns.current);

  const tabBarVisible = user != null && provider != null;
  const initialRouteName = user == null ? BottomTabsRoutes.Profile : BottomTabsRoutes.ScanQRCode;

  return (
    <Navigator
      tabBar={BottomTabBar}
      screenOptions={{tabBarVisible}}
      initialRouteName={initialRouteName}
      backBehavior="none"
    >
      <Screen name={BottomTabsRoutes.Profile} component={ProfileScreen} />
      <Screen name={BottomTabsRoutes.ScanQRCode} component={ScanQRCodeScreen} />
      <Screen name={BottomTabsRoutes.MyCheckIns} component={CheckInsNavigator} />
    </Navigator>
  );
};

export default MainBottomNavigator;
