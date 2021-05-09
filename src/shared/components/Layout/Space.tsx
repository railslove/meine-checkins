import React from 'react';
import {View} from 'react-native';
import {px2dp} from 'src/shared/styles/createStyles';

interface SpaceVerticalProps {
  s: number;
}
const SpaceVertical = ({s}: SpaceVerticalProps) => (
  <View
    style={{
      marginVertical: px2dp(s),
    }}
  />
);

const Space = {
  V: SpaceVertical,
};

export default Space;
