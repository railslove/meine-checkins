import React from 'react';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomTabBar from 'src/features/navigation/components/BottomTabBar';
import {BottomTabsRoutes} from 'src/features/navigation/routes';

import ProfileScreen from 'src/features/profile/ProfileScreen';
import ScanQRCodeScreen from 'src/features/scan/ScanQRCodeScreen';
import CheckInsNavigator from 'src/features/navigation/CheckInsNavigator';
import {useTheme} from 'react-native-paper';

const {Navigator, Screen} = createBottomTabNavigator<Record<BottomTabsRoutes, any>>();

const BottomNavigator: React.FC = () => {
  const theme = useTheme();
  const user = useSelector(state => state.user.item);
  const checkIns = useSelector(state => state.checkIns);

  const tabBarVisible = user != null;
  const initialRouteName = user == null ? BottomTabsRoutes.Profile : BottomTabsRoutes.ScanQRCode;
  const highlightScanButton = checkIns.current == null && checkIns.items.length === 0;

  return (
    <Navigator
      tabBar={props => (
        <BottomTabBar {...props} theme={theme} highlightScanButton={highlightScanButton} />
      )}
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
