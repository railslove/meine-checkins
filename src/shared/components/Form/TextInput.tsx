import React from 'react';
import {TextInput as RPTextInput} from 'react-native';
import {StyleSheet, TextInputProps as RNTextInputProps} from 'react-native';
import theme from 'src/shared/theme/theme';

const styles = StyleSheet.create({
  root: {
    padding: 20,
    fontSize: 14,
    lineHeight: 14,
    borderRadius: theme.roundness,
    marginBottom: 20,

    color: '#393939',
    backgroundColor: '#EDEDED',
  },
});

export type TextInputProps = RNTextInputProps;

const TextInput: React.FC<TextInputProps> = props => {
  return <RPTextInput {...props} style={styles.root} />;
};

export default TextInput;
