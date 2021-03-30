import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as RPButton} from 'react-native-paper';

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
  content: {
    paddingVertical: 7,
  },
});

export type ButtonProps = {
  onPress?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = props => {
  return (
    <RPButton
      mode="contained"
      style={styles.root}
      labelStyle={styles.label}
      contentStyle={styles.content}
      {...props}
    />
  );
};

export default Button;
