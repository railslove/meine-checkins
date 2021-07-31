import React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {px2dp} from 'src/shared/styles/createStyles';

const size = px2dp(19);

const CircledCheckIcon: React.FC<SvgProps> = props => {
  const {colors} = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20ZM14.2929 7.29289L9 12.5858L6.70711 10.2929L5.29289 11.7071L9 15.4142L15.7071 8.70711L14.2929 7.29289Z"
        fill="white"
      />
    </Svg>
  );
};

export default CircledCheckIcon;
