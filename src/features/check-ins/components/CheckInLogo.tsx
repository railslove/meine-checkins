import React from 'react';
import {useTheme} from 'react-native-paper';
import {ImageSourcePropType, View} from 'react-native';

import Image from 'src/shared/components/Image/Image';
import createStyles from 'src/shared/styles/createStyles';
import CheckInLogoPlaceholder from './CheckInLogoPlaceholder';

export const CHECKIN_LOGO_DIMENSIONS = {
  width: 67,
  height: 52,
};

export type CheckInLogoProps = {
  src?: string | ImageSourcePropType;
  dimensions?: typeof CHECKIN_LOGO_DIMENSIONS;
};

export const CHECKIN_LOGO_BORDER_RADIUS = 5;

const useStyles = ({dimensions}: Pick<CheckInLogoProps, 'dimensions'>) => {
  const theme = useTheme();

  return createStyles({
    root: {
      borderRadius: CHECKIN_LOGO_BORDER_RADIUS,

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
      margin: 10,
      alignSelf: 'stretch',
    },
  });
};

const CheckInLogo: React.FC<CheckInLogoProps> = ({src, dimensions = CHECKIN_LOGO_DIMENSIONS}) => {
  const styles = useStyles({dimensions});

  const source =
    typeof src === 'string'
      ? {
          uri: src,
        }
      : src;

  return (
    <View style={styles.root}>
      {source == null ? (
        <CheckInLogoPlaceholder />
      ) : (
        <Image source={source} style={styles.image} resizeMode="contain" />
      )}
    </View>
  );
};

export default CheckInLogo;
