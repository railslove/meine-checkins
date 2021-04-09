import {useTheme} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, StyleSheet} from 'react-native';

import {BottomTabsRoutes} from 'src/features/navigation/constants';
import MyCheckInsIcon from 'src/shared/components/Icon/MyCheckInsIcon';
import ProfileIcon from 'src/shared/components/Icon/ProfileIcon';
import ScanQRIcon from 'src/shared/components/Icon/ScanQRIcon';
import Space from 'src/shared/components/Layout/Space';
import {toDpFromPixel} from 'src/shared/theme/util';

export type BottomTabItemProps = {
  route: BottomTabsRoutes;
  isSelected: boolean;
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#7B7A7A',
    margin: 0,
    height: 'auto',
    padding: 0,

    fontFamily: 'Inter-Bold',
    fontWeight: '700',

    fontSize: toDpFromPixel(12),
    lineHeight: toDpFromPixel(14),
  },
});

const BottomTabItem: React.FC<BottomTabItemProps> = props => {
  const {route, isSelected} = props;

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

    case BottomTabsRoutes.MyCheckIns: {
      return (
        <View style={styles.root}>
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
