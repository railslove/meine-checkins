import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button as RPButton} from 'react-native-paper';
import {px2dp} from 'src/shared/styles/createStyles';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  main: {
    width: '85%',
  },
  label: {
    fontWeight: '700',
    fontFamily: 'Inter-Bold',

    fontSize: px2dp(13),
    lineHeight: px2dp(17),
    letterSpacing: px2dp(16 * 0.075),
  },
  content: {
    paddingVertical: px2dp(7),
  },
  fullWidth: {
    width: '100%',
  },
});

export type ButtonProps = {
  mode?: 'text' | 'outlined' | 'contained';
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
};

const Button: React.FC<ButtonProps> = ({fullWidth, ...props}) => {
  return (
    <View style={styles.root}>
      <RPButton
        mode="contained"
        style={fullWidth ? styles.fullWidth : styles.main}
        labelStyle={styles.label}
        contentStyle={styles.content}
        {...props}
      />
    </View>
  );
};

export default Button;
