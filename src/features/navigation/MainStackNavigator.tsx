import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MainStack} from 'src/features/navigation/constants';

import StartScreen from 'src/features/navigation/StartScreen';
import MainBottomNavigation from 'src/features/navigation/MainBottomNavigator';

const {Navigator, Screen} = createStackNavigator<Record<MainStack, any>>();

const StartStackNavigation: React.FC = () => {
  return (
    <Navigator initialRouteName={MainStack.Start}>
      <Screen name={MainStack.Start} component={StartScreen} />
      <Screen name={MainStack.MainNavigation} component={MainBottomNavigation} />
    </Navigator>
  );
};

export default StartStackNavigation;
