import React from 'react';
import {TextInput as RPTextInput, useTheme} from 'react-native-paper';
import {StyleSheet, TextInputProps as RNTextInputProps} from 'react-native';

import {px2dp} from 'src/shared/styles/createStyles';

const styles = StyleSheet.create({
  root: {
    height: px2dp(20),
    marginBottom: px2dp(10),
    paddingVertical: px2dp(14),

    textAlign: 'left',

    fontSize: px2dp(13),
    lineHeight: px2dp(14),
    fontFamily: 'Inter-Regular',
  },
});

export type TextInputProps = Omit<RNTextInputProps, 'selectionColor'> & {
  name?: string;
  label?: string;
  error?: boolean;
};

const TextInput: React.FC<TextInputProps> = props => {
  const theme = useTheme();

  const style = StyleSheet.flatten([
    styles.root,
    {
      color: theme.colors.text,
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.background,
    },
  ]);

  return (
    <RPTextInput
      {...props}
      mode="flat"
      dense={true}
      style={style}
      autoCorrect={true}
      underlineColor="transparent"
      allowFontScaling={false}
      placeholderTextColor="black"
      underlineColorAndroid="transparent"
    />
  );
};

export default TextInput;
