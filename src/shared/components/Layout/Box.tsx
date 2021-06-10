import React from 'react';
import {View, ViewStyle} from 'react-native';
import {transformStyleRules} from 'src/shared/styles/createStyles';

export type BoxProps = Partial<ViewStyle>;

const Box: React.FC<BoxProps> = ({children, ...style}) => {
  return <View style={transformStyleRules(style)}>{children}</View>;
};

export default Box;
