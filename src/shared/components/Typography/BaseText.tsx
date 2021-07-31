import React from 'react';
import {Text, TextProps} from 'react-native';

const BaseText: React.FC<TextProps> = ({children, ...rest}) => (
  <Text allowFontScaling={false} {...rest}>
    {children}
  </Text>
);

export default BaseText;
