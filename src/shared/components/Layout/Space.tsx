import React from 'react';
import TextBox from '../Typography/TextBox';

interface SpaceVerticalProps {
  s: number;
}
const SpaceVertical = ({s}: SpaceVerticalProps) => <TextBox lineHeight={2 * s}> </TextBox>;

const Space = {
  V: SpaceVertical,
};

export default Space;
