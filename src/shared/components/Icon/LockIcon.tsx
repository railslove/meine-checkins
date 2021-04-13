import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {toDpFromPixel} from 'src/shared/theme/util';

const size = toDpFromPixel(30);

const LockIcon: React.FC = () => {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Rect width="30" height="30" rx="8" fill="#D7E3FF" />
      <Path
        d="M19.6071 14.125H18.9107V12.1562C18.9107 9.86484 16.9317 8 14.5 8C12.0683 8 10.0893 9.86484 10.0893 12.1562V14.125H9.39286C8.62388 14.125 8 14.7129 8 15.4375V20.6875C8 21.4121 8.62388 22 9.39286 22H19.6071C20.3761 22 21 21.4121 21 20.6875V15.4375C21 14.7129 20.3761 14.125 19.6071 14.125ZM16.5893 14.125H12.4107V12.1562C12.4107 11.0707 13.348 10.1875 14.5 10.1875C15.652 10.1875 16.5893 11.0707 16.5893 12.1562V14.125Z"
        fill="#3772FF"
      />
    </Svg>
  );
};

export default LockIcon;
