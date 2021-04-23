import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {SvgIconProps} from 'src/shared/components/Icon/types';
import {toDpFromPixel} from 'src/shared/theme/util';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: toDpFromPixel(10),
    marginBottom: toDpFromPixel(8),
    borderRadius: toDpFromPixel(10),
    backgroundColor: 'transparent',
  },
});

const width = toDpFromPixel(25);
const height = toDpFromPixel(25);
const strokeWidth = 2;

const ScanQRIcon: React.FC<SvgIconProps> = ({isSelected}) => {
  const theme = useTheme();
  const stroke = isSelected ? theme.colors.primary : theme.colors.backdrop;
  const backgroundColor = `rgba(55, 114, 255, ${isSelected ? '0.2' : '0.1'})`;

  const rootStyles = [
    styles.root,
    {
      backgroundColor,
      color: stroke,
    },
  ];

  return (
    <View style={rootStyles}>
      <Svg width={width} height={height} viewBox="0 0 20 22" fill="none">
        <G clip-path="url(#clip0)">
          <Path
            d="M14 1H16C17.7 1 19 2.3 19 4C19 4.9 19 6 19 7"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <Path
            d="M14 21H16C17.7 21 19 19.7 19 18C19 17.1 19 16 19 15"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <Path
            d="M6 1H4C2.3 1 1 2.3 1 4C1 4.9 1 6 1 7"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <Path
            d="M6 21H4C2.3 21 1 19.7 1 18C1 17.1 1 16 1 15"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <Path d="M6 11H14" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
        </G>
        <Defs>
          <ClipPath id="clip0">
            <Rect width="20" height="22" fill={stroke} />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

export default ScanQRIcon;
