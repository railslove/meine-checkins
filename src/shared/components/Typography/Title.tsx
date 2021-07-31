import React from 'react';
import {TextStyle, View} from 'react-native';

import createStyles from 'src/shared/styles/createStyles';
import BaseText from './BaseText';

const useStyles = ({color = '#060606', ...restTextStyles}: Omit<TitleProps, 'children'> = {}) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      marginBottom: 14,
    },
    text: {
      color,

      margin: 0,
      height: 'auto',
      padding: 0,

      fontSize: 22,
      fontFamily: 'Inter-Bold',
      fontWeight: '700',
      lineHeight: 26,

      ...restTextStyles,
    },
  });

export type TitleProps = TextStyle & {
  /**
   * split the text in multiple lines
   * @default true
   */
  split?: boolean;
  children: string;
};

const Title: React.FC<TitleProps> = ({children, split = true, ...textStyles}) => {
  const style = useStyles(textStyles);

  if (!split) {
    return <BaseText style={style.text}>{children}</BaseText>;
  }

  return (
    <View style={style.root}>
      {children
        .trim()
        .split(/\s+/)
        .map(el => {
          return (
            <BaseText key={el} style={style.text}>
              {el}
            </BaseText>
          );
        })}
    </View>
  );
};

export default Title;
