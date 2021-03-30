import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import StartScreen from 'src/features/navigation/StartScreen';
import MainBottomNavigation from 'src/features/navigation/MainBottomNavigator';

export enum MainStackRoutes {
  Start = 'Start',
  MainNavigation = 'MainNavigation',
}

const {Navigator, Screen} = createStackNavigator<Record<MainStackRoutes, any>>();

const StartStackNavigation: React.FC = () => {
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
