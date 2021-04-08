import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {toDpFromPixel} from 'src/shared/theme/util';
import {ProviderCheckInItem} from 'src/shared/models/Supplier';

import Box from 'src/shared/components/Layout/Box';
import Image from 'src/shared/components/Image/Image';
import Space from 'src/shared/components/Layout/Space';
import {formatItemDate} from 'src/shared/format/date';

const useStyles = () => {
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
  });
};

export type CheckInItemCardProps = Pick<ProviderCheckInItem, 'name' | 'logoUrl' | 'startTime'>;

const CheckInItemCard: React.FC<CheckInItemCardProps> = props => {
  const styles = useStyles();

  const {name, logoUrl, startTime} = props;

  return (
    <View style={styles.root}>
      <Box borderColor="red">
        <Image
          source={{
            uri: logoUrl,
            width: toDpFromPixel(67),
            height: toDpFromPixel(52),
          }}
          style={{borderRadius: toDpFromPixel(5)}}
          resizeMethod="scale"
        />
      </Box>

      <Box flex={1} marginLeft={toDpFromPixel(22)}>
        <Text style={styles.companyName}>{name}</Text>
        {startTime ? (
          <>
            <Space.V s={4} />
            <Text>{formatItemDate(startTime)}</Text>
          </>
        ) : null}
      </Box>

      <Box>
        <Image source={{uri: logoUrl}} />
      </Box>
    </View>
  );
};

export default CheckInItemCard;
