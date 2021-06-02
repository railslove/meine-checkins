import {SvgProps} from 'react-native-svg';

export type SvgIconProps = SvgProps &
  Partial<{
    isSelected: boolean;
  }>;
