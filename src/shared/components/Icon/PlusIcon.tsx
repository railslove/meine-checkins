import React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {SvgIconProps} from 'src/shared/components/Icon/types';
import {toDpFromPixel} from 'src/shared/theme/util';

const size = toDpFromPixel(18);

const PlusIcon: React.FC<SvgIconProps> = ({isSelected}) => {
  const theme = useTheme();

  const fill = isSelected ? theme.colors.primary : '#7B7A7A';

  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M16.7143 7.35719H10.9286V1.57148C10.9286 0.861525 10.3528 0.285767 9.64286 0.285767H8.35714C7.64719 0.285767 7.07143 0.861525 7.07143 1.57148V7.35719H1.28571C0.575759 7.35719 0 7.93295 0 8.64291V9.92862C0 10.6386 0.575759 11.2143 1.28571 11.2143H7.07143V17C7.07143 17.71 7.64719 18.2858 8.35714 18.2858H9.64286C10.3528 18.2858 10.9286 17.71 10.9286 17V11.2143H16.7143C17.4242 11.2143 18 10.6386 18 9.92862V8.64291C18 7.93295 17.4242 7.35719 16.7143 7.35719Z"
        fill={fill}
      />
    </Svg>
  );
};

export default PlusIcon;
