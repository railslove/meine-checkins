import {configureFonts, DefaultTheme} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/types';
import {px2dp} from 'src/shared/styles/createStyles';
import {FONT_FAMILY_REGULAR as fontFamily} from 'src/shared/styles/fonts';

const fonts: Parameters<typeof configureFonts>[0] = {
  ios: {
    regular: {
      fontFamily,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Inter-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Inter-Thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Inter-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Inter-Thin',
      fontWeight: 'normal',
    },
  },
};

const theme: Theme = {
  ...DefaultTheme,
  fonts: configureFonts(fonts),
  colors: {
    ...DefaultTheme.colors,
    primary: '#3772FF',
  },
  roundness: px2dp(8),
};

export default theme;
