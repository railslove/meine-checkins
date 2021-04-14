import React from 'react';
import {useSelector} from 'react-redux';

import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';

import StartScreen from 'src/features/start/StartScreen';
import MainBottomNavigation from 'src/features/navigation/MainBottomNavigator';
import {MainStackRoutes} from 'src/features/navigation/constants';

const {Navigator, Screen} = createStackNavigator<Record<MainStackRoutes, any>>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const StartStackNavigation: React.FC = () => {
  const user = useSelector(state => state.user.item);

  const initialRoute = user == null ? MainStackRoutes.Start : MainStackRoutes.MainNavigation;

  return (
    <Navigator initialRouteName={initialRoute} screenOptions={screenOptions}>
      <Screen name={MainStackRoutes.Start} component={StartScreen} />
      <Screen name={MainStackRoutes.MainNavigation} component={MainBottomNavigation} />
    </Navigator>
  );
};

export default StartStackNavigation;
