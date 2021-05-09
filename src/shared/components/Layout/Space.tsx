import React from 'react';
import {View} from 'react-native';
import {toDpFromPixel} from 'src/shared/styles/util';

interface SpaceVerticalProps {
  s: number;
}
const SpaceVertical = ({s}: SpaceVerticalProps) => (
  <View
    style={{
      marginVertical: toDpFromPixel(s),
    }}
  />
);

const Space = {
  V: SpaceVertical,
};

export default Space;
