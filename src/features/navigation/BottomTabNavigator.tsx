import React from 'react';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomTabBar from 'src/features/navigation/components/BottomTabBar';
import {BottomTabsRoutes} from 'src/features/navigation/routes';

import ProfileScreen from 'src/features/profile/ProfileScreen';
import ScanQRCodeScreen from 'src/features/scan/ScanQRCodeScreen';
import CheckInsNavigator from 'src/features/navigation/CheckInsNavigator';
import ProviderFormScreen from 'src/features/check-ins/ProviderFormScreen';

const {Navigator, Screen} = createBottomTabNavigator<Record<BottomTabsRoutes, any>>();

const BottomNavigator: React.FC = () => {
  const theme = useTheme();
  const user = useSelector(state => state.user.item);
  const checkIns = useSelector(state => state.checkIns);

  const tabBarVisible = user != null;
  const checkInActive = checkIns.current != null;
  const initialRouteName = user == null ? BottomTabsRoutes.Profile : BottomTabsRoutes.ScanQRCode;
  const highlightScanButton = checkIns.current == null && checkIns.items.length === 0;

  return (
    <Navigator
      tabBar={props => (
        <BottomTabBar
          {...props}
          theme={theme}
          checkInActive={checkInActive}
          highlightScanButton={highlightScanButton}
        />
      )}
      backBehavior="none"
      screenOptions={{tabBarVisible, unmountOnBlur: false}}
      initialRouteName={initialRouteName}
    >
      <Screen name={BottomTabsRoutes.Profile} component={ProfileScreen} />
      <Screen name={BottomTabsRoutes.ScanQRCode} component={ScanQRCodeScreen} />
      <Screen name={BottomTabsRoutes.ProviderForm} component={ProviderFormScreen} />
      <Screen name={BottomTabsRoutes.CheckInsNavigator} component={CheckInsNavigator} />
    </Navigator>
  );
};

export default BottomNavigator;
