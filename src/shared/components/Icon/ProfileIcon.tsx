import React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {SvgIconProps} from 'src/shared/components/Icon/types';
import {toDpFromPixel} from 'src/shared/styles/util';

const size = toDpFromPixel(22);

const ProfileIcon: React.FC<SvgIconProps> = ({isSelected}) => {
  const theme = useTheme();

  const fill = isSelected ? theme.colors.primary : '#7B7A7A';

  return (
    <Svg width={size} height={size} viewBox="0 0 20 21" fill="none">
      <Path
        d="M14 12.4688C12.7188 12.4688 12.1027 13.125 10 13.125C7.89732 13.125 7.28571 12.4688 6 12.4688C2.6875 12.4688 0 14.9379 0 17.9812V19.0312C0 20.1182 0.959821 21 2.14286 21H17.8571C19.0402 21 20 20.1182 20 19.0312V17.9812C20 14.9379 17.3125 12.4688 14 12.4688ZM17.8571 19.0312H2.14286V17.9812C2.14286 16.0289 3.875 14.4375 6 14.4375C6.65179 14.4375 7.70982 15.0938 10 15.0938C12.308 15.0938 13.3438 14.4375 14 14.4375C16.125 14.4375 17.8571 16.0289 17.8571 17.9812V19.0312ZM10 11.8125C13.5491 11.8125 16.4286 9.16699 16.4286 5.90625C16.4286 2.64551 13.5491 0 10 0C6.45089 0 3.57143 2.64551 3.57143 5.90625C3.57143 9.16699 6.45089 11.8125 10 11.8125ZM10 1.96875C12.3616 1.96875 14.2857 3.73652 14.2857 5.90625C14.2857 8.07598 12.3616 9.84375 10 9.84375C7.63839 9.84375 5.71429 8.07598 5.71429 5.90625C5.71429 3.73652 7.63839 1.96875 10 1.96875Z"
        fill={fill}
      />
    </Svg>
  );
};

export default ProfileIcon;
