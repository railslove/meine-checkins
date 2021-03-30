import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button as RPButton} from 'react-native-paper';

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
  content: {
    paddingVertical: 7,
  },

  label: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
});

export type ButtonProps = {
  onPress?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = props => {
  return (
    <View style={styles.root}>
      <RPButton
        mode="contained"
        compact={false}
        style={styles.main}
        labelStyle={styles.label}
        contentStyle={styles.content}
        {...props}
      />
    </View>
  );
};

export default Button;
