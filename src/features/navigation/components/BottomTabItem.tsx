import {useTheme} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';

import createStyles from 'src/shared/styles/createStyles';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import BaseText from 'src/shared/components/Typography/BaseText';
import ScanQRIcon from 'src/shared/components/Icon/ScanQRIcon';
import ProfileIcon from 'src/shared/components/Icon/ProfileIcon';
import MyCheckInsIcon from 'src/shared/components/Icon/MyCheckInsIcon';
import {BottomTabsRoutes} from 'src/features/navigation/routes';

export type BottomTabItemProps = {
  route: BottomTabsRoutes;
  isSelected: boolean;
  hasNewCheckIn: boolean;
};

const styles = createStyles({
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

    fontSize: 12,
    lineHeight: 14,
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
          <BaseText style={textStyle}>{t('profile')}</BaseText>
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
              top={-5}
              right={25}
              width={6}
              height={6}
              borderRadius={3}
              backgroundColor="#3772FF"
            />
          ) : undefined}

          <MyCheckInsIcon isSelected={isSelected} />
          <Space.V s={5} />
          <BaseText style={textStyle}>{t('checkIns')}</BaseText>
        </View>
      );
    }
    default: {
      return null;
    }
  }
};

export default BottomTabItem;
