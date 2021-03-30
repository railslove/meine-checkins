import React from 'react';
import {View, ViewStyle} from 'react-native';

export type BoxProps = Partial<ViewStyle>;

const Box: React.FC<BoxProps> = ({children, ...style}) => {
  return <View style={style}>{children}</View>;
};

export default Box;
