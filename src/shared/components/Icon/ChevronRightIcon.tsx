import React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';

const ChevronRightIcon: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
      <Path
        d="M8.07948 1.74399L9.021 0.833447C9.41966 0.447899 10.0643 0.447899 10.4587 0.833447L18.7034 8.80278C19.102 9.18833 19.102 9.81177 18.7034 10.1932L10.4587 18.1667C10.0601 18.5522 9.41542 18.5522 9.021 18.1667L8.07948 17.2561C7.67658 16.8665 7.68506 16.2307 8.09644 15.8493L13.2069 11.1407L1.01809 11.1407C0.454027 11.1407 0.000232697 10.7018 0.000232697 10.1563V8.8438C0.000232697 8.29829 0.454027 7.85942 1.01809 7.85942L13.2069 7.85942L8.09644 3.15083C7.68082 2.76938 7.67234 2.13364 8.07948 1.74399Z"
        fill={colors.primary}
      />
    </Svg>
  );
};

export default ChevronRightIcon;
