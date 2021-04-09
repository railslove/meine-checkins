import React from 'react';
import {TextInput as RPTextInput, useTheme} from 'react-native-paper';
import {StyleSheet, TextInputProps as RNTextInputProps} from 'react-native';

import {toDpFromPixel} from 'src/shared/theme/util';

const styles = StyleSheet.create({
  root: {
    height: toDpFromPixel(20),
    padding: toDpFromPixel(14),
    marginBottom: toDpFromPixel(14),

    textAlign: 'left',

    fontSize: toDpFromPixel(12),
    lineHeight: toDpFromPixel(14),
    fontFamily: 'Inter-Regular',

    color: '#393939',
    backgroundColor: '#EDEDED',
  },
  label: {},
});

export type TextInputProps = Omit<RNTextInputProps, 'selectionColor'> & {
  label?: string;
};

const TextInput: React.FC<TextInputProps> = props => {
  const theme = useTheme();

  const style = StyleSheet.flatten([
    styles.root,
    {
      borderRadius: theme.roundness,
    },
  ]);

  return (
    <RPTextInput
      {...props}
      mode="flat"
      dense={true}
      style={style}
      clearTextOnFocus
      underlineColor="transparent"
      placeholderTextColor="black"
      underlineColorAndroid="transparent"
    />
  );
};

export default TextInput;
