import React from 'react';
import {TextInput as RPTextInput} from 'react-native';
import {StyleSheet, TextInputProps as RNTextInputProps} from 'react-native';
import theme from 'src/shared/theme/theme';
import {toDpFromPixel} from 'src/shared/theme/util';

const styles = StyleSheet.create({
  root: {
    padding: toDpFromPixel(16),

    fontSize: toDpFromPixel(12),
    lineHeight: toDpFromPixel(14),
    fontWeight: '400',
    fontFamily: 'Inter-Regular',

    borderRadius: theme.roundness,
    marginBottom: toDpFromPixel(14),

    color: '#393939',
    backgroundColor: '#EDEDED',
  },
});

export type TextInputProps = RNTextInputProps;

const TextInput: React.FC<TextInputProps> = props => {
  return <RPTextInput {...props} style={styles.root} placeholderTextColor="black" />;
};

export default TextInput;
