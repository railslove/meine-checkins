import {configureFonts, DefaultTheme} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/types';
import {toDpFromPixel} from 'src/shared/theme/util';

const fonts: Parameters<typeof configureFonts>[0] = {
  ios: {
    regular: {
      fontFamily: 'Inter-Regular',
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
      fontFamily: 'Inter-Regular',
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
  roundness: toDpFromPixel(8),
};

export default theme;
