import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {DESIGN_VIEWPORT_SIZE} from 'src/shared/styles/constants';

type StyleRules = ViewStyle | TextStyle | ImageStyle;
type StyleRuleKey = keyof StyleRules;
type StyleRuleValue = StyleRules[StyleRuleKey];

type NamedStyles<T> = {[P in keyof T]: StyleRules};

/**
 * mas pixel value to closest value of current device
 *
 * width and height values below come from the figma design of the app
 */
export const px2dp = create(DESIGN_VIEWPORT_SIZE);

const shouldTransformStyleValue = (
  styleKey: keyof ViewStyle | keyof TextStyle,
  styleValue: StyleRuleValue
) => {
  switch (styleKey) {
    case 'flex': {
      return false;
    }
    default: {
      return typeof styleValue === 'number';
    }
  }
};

export const transformStyleRules = (styleRules: StyleRules) => {
  const result: StyleRules = {};
  const styleKeys = Object.keys(styleRules) as StyleRuleKey[];

  return styleKeys.reduce((acc, key) => {
    const value = styleRules[key];

    if (typeof value === 'number' && shouldTransformStyleValue(key, value)) {
      return {
        ...acc,
        [key]: px2dp(value),
      };
    }

    return {
      ...acc,
      [key]: value,
    };
  }, result);
};

const createStyles = <S extends NamedStyles<S> | NamedStyles<any>>(styles: S) => {
  const result = {} as S;
  const styleKeys = Object.keys(styles) as (keyof typeof styles)[];

  return StyleSheet.create(
    styleKeys.reduce((acc, key) => {
      const rules = styles[key];

      return {
        ...acc,
        [key]: transformStyleRules(rules),
      };
    }, result)
  );
};

export default createStyles;
