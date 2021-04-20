import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  BottomTabBarOptions,
  BottomTabBarProps as RNBottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import {toDpFromPixel} from 'src/shared/theme/util';
import {BottomTabsRoutes} from 'src/features/navigation/routes';

import BottomTabItem from 'src/features/navigation/components/BottomTabItem';

export type BottomTabBarProps = RNBottomTabBarProps<BottomTabBarOptions>;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: toDpFromPixel(15),
    paddingHorizontal: '5%',
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    borderTopWidth: toDpFromPixel(1),
  },
});

const BottomTabBar: React.FC<BottomTabBarProps> = ({state, navigation, descriptors}) => {
  const currentRoute = state.routes[state.index];
  const focusedOptions = descriptors[currentRoute.key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.root}>
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
            accessibilityState={{selected: isSelected}}
            onPress={onPress}
          >
            <BottomTabItem route={route} isSelected={isSelected} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;
