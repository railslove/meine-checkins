import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from 'react-native-paper';

import {SvgIconProps} from 'src/shared/components/Icon/types';
import {px2dp} from 'src/shared/styles/createStyles';

export const CHECKIN_LOGO_PLACEHOLDER_DIMENSIONS = {
  width: px2dp(35),
  height: px2dp(35),
};

export type CheckInLogoPlaceholderProps = SvgIconProps & {
  dimensions?: typeof CHECKIN_LOGO_PLACEHOLDER_DIMENSIONS;
};

const CheckInLogoPlaceholder: React.FC<CheckInLogoPlaceholderProps> = ({
  style,
  dimensions = CHECKIN_LOGO_PLACEHOLDER_DIMENSIONS,
}) => {
  const {colors} = useTheme();
  const {width, height} = dimensions;

  return (
    <Svg width={width} height={height} viewBox="0 0 29 28" fill="none" style={style}>
      <Path
        d="M0.583221 27.4221L9.77906 10.8651L17.3034 21.4454L21.8789 15.8288L28.6773 27.4221H0.583221Z"
        fill={colors.primary}
      />
      <Path
        d="M20.5113 7.6461C20.5124 8.12075 20.3726 8.58504 20.1096 8.98016C19.8466 9.37528 19.4722 9.68345 19.0339 9.8656C18.5956 10.0478 18.1131 10.0957 17.6475 10.0034C17.182 9.91105 16.7543 9.68261 16.4186 9.34698C16.083 9.01135 15.8545 8.58364 15.7622 8.11806C15.6699 7.65248 15.7179 7.16997 15.9 6.73167C16.0822 6.29336 16.3903 5.91899 16.7854 5.65598C17.1806 5.39297 17.6449 5.25317 18.1195 5.25428C18.7539 5.25428 19.3622 5.50628 19.8108 5.95484C20.2593 6.40339 20.5113 7.01175 20.5113 7.6461Z"
        fill={colors.primary}
      />
    </Svg>
  );
};

export default CheckInLogoPlaceholder;
