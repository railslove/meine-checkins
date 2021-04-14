import React from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';

import {toDpFromPixel} from 'src/shared/theme/util';
import {ProviderCheckInItem} from 'src/shared/models/Provider';

import Box from 'src/shared/components/Layout/Box';
import Image from 'src/shared/components/Image/Image';
import Space from 'src/shared/components/Layout/Space';
import {formatItemDate} from 'src/shared/format/date';
import ChevronRightIcon from 'src/shared/components/Icon/ChevronRightIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';

const useStyles = () => {
  const theme = useTheme();
  const borderRadius = toDpFromPixel(5);

  return StyleSheet.create({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',

      padding: toDpFromPixel(10),
      borderRadius: toDpFromPixel(5),
      backgroundColor: '#F0F1F3',
    },
    companyName: {
      textAlign: 'left',
      fontSize: toDpFromPixel(12),

      fontFamily: 'Inter-Bold',
      fontWeight: '700',
      lineHeight: toDpFromPixel(14.52),
    },
    logoContainer: {
      borderRadius,

      width: toDpFromPixel(67),
      height: toDpFromPixel(42),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
    },
    logoImage: {
      borderRadius,
    },
  });
};

export type CheckInItemCardProps = Pick<ProviderCheckInItem, 'name' | 'logoUrl' | 'startTime'> & {
  isActive?: boolean;
  onNavigate?: () => void;
};

const CheckInItemCard: React.FC<CheckInItemCardProps> = props => {
  const styles = useStyles();

  const {name, logoUrl, startTime, isActive, onNavigate} = props;
  const logoSource =
    typeof logoUrl === 'string'
      ? {
          uri: logoUrl,
        }
      : logoUrl;

  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        {logoSource == null ? null : (
          <Image source={logoSource} style={styles.logoImage} resizeMode="center" />
        )}
      </View>

      <Box flex={1} marginLeft={toDpFromPixel(10)}>
        <Text style={styles.companyName}>{name}</Text>
        {startTime ? (
          <>
            <Space.V s={4} />
            <Text>{formatItemDate(startTime)}</Text>
          </>
        ) : null}
      </Box>

      {isActive ? (
        <Box marginHorizontal={toDpFromPixel(10)}>
          <TouchableOpacity onPress={onNavigate}>
            <ChevronRightIcon />
          </TouchableOpacity>
        </Box>
      ) : null}
    </View>
  );
};

export default CheckInItemCard;
