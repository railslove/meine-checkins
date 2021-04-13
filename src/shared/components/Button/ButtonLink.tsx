import React from 'react';
import {useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';

import {toDpFromPixel} from 'src/shared/theme/util';

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      fontSize: toDpFromPixel(13),
      lineHeight: toDpFromPixel(16),

      color: theme.colors.primary,
      fontWeight: '600',
      fontFamily: 'Inter',
      textTransform: 'none',
    },
  });
};

export type ButtonLinkProps = {
  children: string;
  onPress?: () => void;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({onPress, children}) => {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonLink;
