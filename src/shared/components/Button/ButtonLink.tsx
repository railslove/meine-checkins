import React from 'react';
import {useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';

import createStyles from 'src/shared/styles/createStyles';
import BaseText from '../Typography/BaseText';

const useStyles = () => {
  const theme = useTheme();

  return createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      fontSize: 13,
      lineHeight: 16,

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
        <BaseText style={styles.text}>{children}</BaseText>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonLink;
