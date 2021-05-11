import React from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';

import {px2dp} from 'src/shared/styles/createStyles';
import {CompletedCheckInItem} from 'src/shared/models/Provider';

import Box from 'src/shared/components/Layout/Box';
import Image from 'src/shared/components/Image/Image';
import {formatItemDate} from 'src/shared/format/date';
import ChevronRightIcon from 'src/shared/components/Icon/ChevronRightIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Space from 'src/shared/components/Layout/Space';

const logoDimensions = {
  width: px2dp(67),
  height: px2dp(52),
};

const useStyles = () => {
  const theme = useTheme();
  const borderRadius = px2dp(5);

  return StyleSheet.create({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: px2dp(9),
      paddingHorizontal: px2dp(10),

      borderRadius: px2dp(5),
      backgroundColor: '#F0F1F3',
    },
    rootTouchable: {
      display: 'flex',
    },
    logoContainer: {
      borderRadius,

      ...logoDimensions,

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
    },
    logoImage: {
      flex: 1,
      width: undefined,
      height: undefined,
      margin: px2dp(10),
      alignSelf: 'stretch',
    },
    companyName: {
      textAlign: 'left',
      fontSize: px2dp(12),

      fontFamily: 'Inter-Bold',
      fontWeight: '600',
      lineHeight: px2dp(15),
    },
    dateTime: {
      textAlign: 'left',
      fontSize: px2dp(11),
      fontWeight: '400',
      lineHeight: px2dp(15),
    },
  });
};

export type CheckInItemCardProps = {
  item: Pick<CompletedCheckInItem, 'name' | 'logoUrl'> &
    (
      | {
          startTime?: CompletedCheckInItem['stopTime'];
          stopTime?: never;
        }
      | {
          startTime: CompletedCheckInItem['stopTime'];
          stopTime: CompletedCheckInItem['stopTime'];
        }
    );
  onNavigate?: () => void;
};

const CheckInItemCard: React.FC<CheckInItemCardProps> = props => {
  const {
    item: {name, logoUrl, startTime, stopTime},
    onNavigate,
  } = props;

  const styles = useStyles();

  const logoSource =
    typeof logoUrl === 'string'
      ? {
          uri: logoUrl,
        }
      : logoUrl;

  const cardItem = (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        {logoSource == null ? null : (
          <Image source={logoSource} style={styles.logoImage} resizeMode="contain" />
        )}
      </View>

      <Box flex={1} marginLeft={px2dp(22)}>
        <Text style={styles.companyName}>{name}</Text>
        {startTime != null ? (
          <>
            <Space.V s={3} />
            <Text style={styles.dateTime}>{formatItemDate(startTime, stopTime)}</Text>
          </>
        ) : null}
      </Box>

      {stopTime == null ? (
        <Box marginHorizontal={px2dp(10)}>
          <ChevronRightIcon />
        </Box>
      ) : null}
    </View>
  );

  if (stopTime) {
    return cardItem;
  }

  return (
    <TouchableOpacity style={styles.rootTouchable} onPress={onNavigate}>
      {cardItem}
    </TouchableOpacity>
  );
};

export default CheckInItemCard;
