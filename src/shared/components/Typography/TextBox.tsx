import React from 'react';
import {Text, TextStyle} from 'react-native';

import {FONT_FAMILY_REGULAR} from 'src/shared/styles/fonts';

import {transformStyleRules} from '../../styles/createStyles';

export type TextBoxProps = TextStyle;

const TextBox: React.FC<TextBoxProps> = ({children, testID, ...styleProps}) => {
  const style = transformStyleRules({fontFamily: FONT_FAMILY_REGULAR, ...styleProps});
  return (
    <Text style={style} testID={testID}>
      {children}
    </Text>
  );
};

export default TextBox;
