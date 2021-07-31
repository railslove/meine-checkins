import React, {Fragment} from 'react';
import {useTheme} from 'react-native-paper';
import {TouchableOpacity, View, ViewStyle} from 'react-native';

import createStyles from 'src/shared/styles/createStyles';
import BaseText from '../Typography/BaseText';

const useStyles = (props: ButtonProps) => {
  const theme = useTheme();

  const common: ViewStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,

    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,

    borderWidth: 3,
    borderRadius: 7,
    borderColor: props.mode === 'text' ? 'transparent' : theme.colors.primary,
    backgroundColor: props.mode === 'text' ? 'transparent' : theme.colors.primary,
  };

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
      textTransform: 'uppercase',

      fontSize: 13,
      lineHeight: 17,
      letterSpacing: 16 * 0.075,
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
  const {children, fullWidth, ...restProps} = props;

  return (
    <View style={styles.root}>
      <TouchableOpacity style={fullWidth ? styles.fullWidth : styles.main} {...restProps}>
        {React.Children.map(children, (child, index) => {
          return (
            <Fragment key={index}>
              {typeof child === 'string' ? (
                <BaseText style={styles.label}>{children}</BaseText>
              ) : (
                child
              )}
            </Fragment>
          );
        })}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
