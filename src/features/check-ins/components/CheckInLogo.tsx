import React from 'react';
import {useTheme} from 'react-native-paper';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';

import Image from 'src/shared/components/Image/Image';
import {px2dp} from 'src/shared/styles/createStyles';

export const LOGO_DIMENSIONS = {
  width: px2dp(67),
  height: px2dp(52),
};

export type CheckInLogoProps = {
  src?: string | ImageSourcePropType;
  dimensions?: typeof LOGO_DIMENSIONS;
};

export const LOGO_BORDER_RADIUS = px2dp(5);

const useStyles = ({dimensions}: Pick<CheckInLogoProps, 'dimensions'>) => {
  const theme = useTheme();

  return StyleSheet.create({
    root: {
      borderRadius: LOGO_BORDER_RADIUS,

      ...dimensions,

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
      margin: px2dp(10),
      alignSelf: 'stretch',
    },
  });
};

const CheckInLogo: React.FC<CheckInLogoProps> = ({src, dimensions = LOGO_DIMENSIONS}) => {
  const styles = useStyles({dimensions});

  const source =
    typeof src === 'string'
      ? {
          uri: src,
        }
      : src;

  return (
    <View style={styles.root}>
      {source == null ? null : <Image source={source} style={styles.image} resizeMode="contain" />}
    </View>
  );
};

export default CheckInLogo;
