import React from 'react';
import {TextStyle} from 'react-native';

import {FONT_FAMILY_REGULAR} from 'src/shared/styles/fonts';

import {transformStyleRules} from '../../styles/createStyles';
import BaseText from './BaseText';

export type TextBoxProps = TextStyle;

const TextBox: React.FC<TextBoxProps> = ({children, testID, ...styleProps}) => {
  const style = transformStyleRules({fontFamily: FONT_FAMILY_REGULAR, ...styleProps});
  return (
    <BaseText style={style} testID={testID}>
      {children}
    </BaseText>
  );
};

export default TextBox;
