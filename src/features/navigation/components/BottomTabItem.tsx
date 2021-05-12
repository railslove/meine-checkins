import {useTheme} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, StyleSheet} from 'react-native';

import Space from 'src/shared/components/Layout/Space';
import ScanQRIcon from 'src/shared/components/Icon/ScanQRIcon';
import ProfileIcon from 'src/shared/components/Icon/ProfileIcon';
import MyCheckInsIcon from 'src/shared/components/Icon/MyCheckInsIcon';
import {px2dp} from 'src/shared/styles/createStyles';
import {BottomTabsRoutes} from 'src/features/navigation/routes';
import Box from 'src/shared/components/Layout/Box';

export type BottomTabItemProps = {
  route: BottomTabsRoutes;
  isSelected: boolean;
  hasNewCheckIn: boolean;
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
  },
  text: {
    color: '#7B7A7A',
    margin: 0,
    height: 'auto',
    padding: 0,

    fontFamily: 'Inter-Bold',
    fontWeight: '700',

    fontSize: px2dp(12),
    lineHeight: px2dp(14),
  },
});

const BottomTabItem: React.FC<BottomTabItemProps> = props => {
  const {route, isSelected, hasNewCheckIn} = props;

  const {t} = useTranslation('navigation');
  const theme = useTheme();

  const textStyle = StyleSheet.flatten([
    styles.text,
    {
      color: isSelected ? theme.colors.primary : '#7B7A7A',
    },
  ]);

  switch (route) {
    case BottomTabsRoutes.Profile: {
      return (
        <View style={styles.root}>
          <ProfileIcon isSelected={isSelected} />
          <Space.V s={5} />
          <Text style={textStyle}>{t('profile')}</Text>
        </View>
      );
    }

    case BottomTabsRoutes.ScanQRCode: {
      return (
        <View style={styles.root}>
          <ScanQRIcon isSelected={isSelected} />
        </View>
      );
    }

    case BottomTabsRoutes.CheckInsNavigator: {
      return (
        <View style={styles.root}>
          {hasNewCheckIn ? (
            <Box
              position="absolute"
              top={px2dp(-5)}
              right={px2dp(25)}
              width={px2dp(6)}
              height={px2dp(6)}
              borderRadius={px2dp(3)}
              backgroundColor="#3772FF"
            />
          ) : undefined}

          <MyCheckInsIcon isSelected={isSelected} />
          <Space.V s={5} />
          <Text style={textStyle}>{t('checkIns')}</Text>
        </View>
      );
    }
    default: {
      return null;
    }
  }
};

export default BottomTabItem;
