import React from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';

import {toDpFromPixel} from 'src/shared/styles/util';
import {CompletedCheckInItem} from 'src/shared/models/Provider';

import Box from 'src/shared/components/Layout/Box';
import Image from 'src/shared/components/Image/Image';
import {formatItemDate} from 'src/shared/format/date';
import ChevronRightIcon from 'src/shared/components/Icon/ChevronRightIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Space from 'src/shared/components/Layout/Space';

const logoDimensions = {
  width: toDpFromPixel(67),
  height: toDpFromPixel(52),
};

const useStyles = () => {
  const theme = useTheme();
  const borderRadius = toDpFromPixel(5);

  return StyleSheet.create({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: toDpFromPixel(9),
      paddingHorizontal: toDpFromPixel(10),

      borderRadius: toDpFromPixel(5),
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
      margin: toDpFromPixel(10),
      alignSelf: 'stretch',
    },
    companyName: {
      textAlign: 'left',
      fontSize: toDpFromPixel(12),

      fontFamily: 'Inter-Bold',
      fontWeight: '600',
      lineHeight: toDpFromPixel(15),
    },
    dateTime: {
      textAlign: 'left',
      fontSize: toDpFromPixel(12),
      fontWeight: '400',
      lineHeight: toDpFromPixel(15),
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

  const itemTime = stopTime || startTime;
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

      <Box flex={1} marginLeft={toDpFromPixel(22)}>
        <Text style={styles.companyName}>{name}</Text>
        {itemTime ? (
          <>
            <Space.V s={3} />
            <Text style={styles.dateTime}>{formatItemDate(itemTime)}</Text>
          </>
        ) : null}
      </Box>

      {stopTime == null ? (
        <Box marginHorizontal={toDpFromPixel(10)}>
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
