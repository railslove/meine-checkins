import React from 'react';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTabsRoutes} from 'src/features/navigation/constants';

import BottomTabBar from 'src/features/navigation/components/BottomTabBar';
import ProfileScreen from 'src/features/profile/ProfileScreen';
import CheckInsNavigator from 'src/features/check-ins/CheckInsNavigator';
import ScanStackNavigator from 'src/features/scan/ScanStackNavigator';

const {Navigator, Screen} = createBottomTabNavigator<Record<BottomTabsRoutes, any>>();

const MainBottomNavigator: React.FC = () => {
  const user = useSelector(state => state.user.item);

  const initialRoute = user == null ? BottomTabsRoutes.Profile : BottomTabsRoutes.ScanQRCode;

  return (
    <Navigator
      tabBar={BottomTabBar}
      screenOptions={{
        tabBarVisible: user != null,
      }}
      initialRouteName={initialRoute}
    >
      <Screen name={BottomTabsRoutes.Profile} component={ProfileScreen} />
      <Screen name={BottomTabsRoutes.ScanQRCode} component={ScanStackNavigator} />
      <Screen name={BottomTabsRoutes.MyCheckIns} component={CheckInsNavigator} />
    </Navigator>
  );
};

export default MainBottomNavigator;
