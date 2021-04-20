import React from 'react';
import {useSelector} from 'react-redux';

import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';

import StartScreen from 'src/features/start/StartScreen';
import MainBottomNavigation from 'src/features/navigation/BottomTabNavigator';
import {RootStackRoutes} from 'src/features/navigation/routes';

const {Navigator, Screen} = createStackNavigator<Record<RootStackRoutes, any>>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const RootStackNavigator: React.FC = () => {
  const {item: user} = useSelector(state => state.user);

  const initialRouteName =
    user == null ? RootStackRoutes.Start : RootStackRoutes.BottomTabNavigator;

  return (
    <Navigator initialRouteName={initialRouteName} screenOptions={screenOptions}>
      <Screen name={RootStackRoutes.Start} component={StartScreen} />
      <Screen name={RootStackRoutes.BottomTabNavigator} component={MainBottomNavigation} />
    </Navigator>
  );
};

export default RootStackNavigator;
