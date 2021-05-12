import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  BottomTabBarOptions,
  BottomTabBarProps as RNBottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import {useTheme} from 'react-native-paper';
import {toDpFromPixel} from 'src/shared/theme/util';
import {BottomTabsRoutes} from 'src/features/navigation/routes';

import ScanHighlight from 'src/features/navigation/components/ScanHighlight';
import BottomTabItem from 'src/features/navigation/components/BottomTabItem';
import NavigationService from 'src/features/navigation/services/NavigationService';

export type BottomTabBarProps = RNBottomTabBarProps<BottomTabBarOptions> & {
  theme: ReturnType<typeof useTheme>;
  checkInActive: boolean;
  highlightScanButton: boolean;
};

const styles = StyleSheet.create({
  root: {
    zIndex: 100,
    position: 'relative',
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

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  theme,
  state,
  descriptors,
  checkInActive,
  highlightScanButton,
}) => {
  const currentRoute = state.routes[state.index];
  const focusedOptions = descriptors[currentRoute.key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const shouldHighlightScan =
    highlightScanButton && currentRoute.name === BottomTabsRoutes.CheckInsNavigator;

  return (
    <View style={styles.root}>
      {Object.values(BottomTabsRoutes).map(route => {
        const isSelected = shouldHighlightScan
          ? route === BottomTabsRoutes.ScanQRCode
          : currentRoute.name === route;

        const shouldShowCheckInActive =
          checkInActive && route === BottomTabsRoutes.CheckInsNavigator;

        const onPress = () => {
          NavigationService.fromBottomTabs(route);
        };

        return (
          <TouchableOpacity
            key={route}
            style={{flex: 1, zIndex: 500}}
            accessibilityRole="button"
            accessibilityState={{selected: isSelected}}
            onPress={onPress}
          >
            <BottomTabItem
              route={route}
              isSelected={isSelected}
              hasNewCheckIn={shouldShowCheckInActive}
            />
          </TouchableOpacity>
        );
      })}
      {shouldHighlightScan ? (
        <ScanHighlight zIndex={200} backgroundColor={theme.colors.background} />
      ) : null}
    </View>
  );
};

export default BottomTabBar;
