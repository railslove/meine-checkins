import React from 'react';
import {View} from 'react-native';
import {Button as RPButton, useTheme} from 'react-native-paper';
import createStyles from 'src/shared/styles/createStyles';

const useStyles = (props: ButtonProps) => {
  const theme = useTheme();

  const common =
    props.mode === 'outlined'
      ? {
          borderWidth: 3,
          borderRadius: 7,
          borderColor: theme.colors.primary,
        }
      : undefined;

  return createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    main: {
      width: '85%',
      ...common,
    },
    fullWidth: {
      width: '100%',
      ...common,
    },
    label: {
      color: 'white',
      fontWeight: '700',
      fontFamily: 'Inter-Bold',

      fontSize: 13,
      lineHeight: 17,
      letterSpacing: 16 * 0.075,
    },
    content: {
      paddingVertical: 5,
    },
  });
};

export type ButtonProps = {
  mode?: 'text' | 'outlined' | 'contained';
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
};

const Button: React.FC<ButtonProps> = props => {
  const styles = useStyles(props);
  const {fullWidth, ...restProps} = props;

  return (
    <View style={styles.root}>
      <RPButton
        mode="contained"
        style={fullWidth ? styles.fullWidth : styles.main}
        labelStyle={styles.label}
        contentStyle={styles.content}
        {...restProps}
      />
    </View>
  );
};

export default Button;
