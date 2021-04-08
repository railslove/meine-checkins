import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button as RPButton} from 'react-native-paper';
import {toDpFromPixel} from 'src/shared/theme/util';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    padding: 0,
    fontWeight: '600',
    fontFamily: 'Inter-Bold',

    fontSize: toDpFromPixel(13),
    lineHeight: toDpFromPixel(16),
  },
  main: {
    margin: 0,
    padding: 0,
  },
  content: {
    margin: 0,
    padding: 0,
  },
  fullWidth: {
    width: '100%',
  },
});

export type ButtonLinkProps = {
  children: React.ReactNode;
  fullWidth?: boolean;
  onPress?: () => void;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({fullWidth, ...props}) => {
  return (
    <View style={styles.root}>
      <RPButton
        mode="text"
        style={fullWidth ? styles.fullWidth : styles.main}
        labelStyle={styles.label}
        contentStyle={styles.content}
        {...props}
      />
    </View>
  );
};

export default ButtonLink;
