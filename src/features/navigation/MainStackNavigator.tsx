import React, {useEffect} from 'react';
import SplashScreen from 'react-native-bootsplash';

import {createStackNavigator} from '@react-navigation/stack';

import StartScreen from 'src/features/navigation/StartScreen';
import MainBottomNavigation from 'src/features/navigation/MainBottomNavigator';

export enum MainStackRoutes {
  Start = 'Start',
  MainNavigation = 'MainNavigation',
}

const {Navigator, Screen} = createStackNavigator<Record<MainStackRoutes, any>>();

const StartStackNavigation: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide({duration: 250});
  }, []);

  return (
    <Navigator
      initialRouteName={MainStackRoutes.Start}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={MainStackRoutes.Start} component={StartScreen} />
      <Screen name={MainStackRoutes.MainNavigation} component={MainBottomNavigation} />
    </Navigator>
  );
};

export default StartStackNavigation;
