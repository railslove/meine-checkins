import React from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';

import {toDpFromPixel} from 'src/shared/theme/util';
import {useTheme} from 'react-native-paper';

import Box from 'src/shared/components/Layout/Box';
import Image from 'src/shared/components/Image/Image';

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
      backgroundColor: '#F0F1F3',
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
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
      overflow: 'hidden',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
    },
    logoImage: {
      maxWidth: '70%',
      maxHeight: '75%',
      borderRadius,
    },
  });
};

export type EmptyCheckInItemCardProps = {
  source: ImageSourcePropType;
};

const EmptyCheckInItemCard: React.FC<EmptyCheckInItemCardProps> = props => {
  const styles = useStyles();

  const {source} = props;

  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <Image source={source} style={styles.logoImage} resizeMode="contain" />
      </View>

      <Box flex={1} />
    </View>
  );
};

export default EmptyCheckInItemCard;
