import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  BottomTabBarOptions,
  BottomTabBarProps as RNBottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import {toDpFromPixel} from 'src/shared/theme/util';
import {BottomTabsRoutes} from 'src/features/navigation/constants';

import Box from 'src/shared/components/Layout/Box';
import BottomTabItem from 'src/features/navigation/components/BottomTabItem';

export type BottomTabBar = {
  label?: string;
  route: BottomTabsRoutes;
  TabIcon: React.FC<{isSelected?: boolean}>;
};

export type BottomTabBarProps = RNBottomTabBarProps<BottomTabBarOptions>;

const BottomTabBar: React.FC<BottomTabBarProps> = ({state, navigation, descriptors}) => {
  const currentRoute = state.routes[state.index];
  const focusedOptions = descriptors[currentRoute.key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Box
      paddingVertical={toDpFromPixel(15)}
      paddingHorizontal="5%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {Object.values(BottomTabsRoutes).map(route => {
        const isSelected = currentRoute.name === route;

        const onPress = () => {
          navigation.navigate(route);
        };

        return (
          <TouchableOpacity
            key={route}
            style={{flex: 1}}
            accessibilityRole="button"
            accessibilityState={isSelected ? {selected: true} : {}}
            onPress={onPress}
          >
            <BottomTabItem route={route} isSelected={isSelected} />
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

export default BottomTabBar;
