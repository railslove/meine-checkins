import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';

import {toDpFromPixel} from 'src/shared/styles/util';

const useStyles = ({color = '#060606', textTransform}: Omit<TitleProps, 'children'> = {}) =>
  StyleSheet.create({
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      marginBottom: toDpFromPixel(14),
    },
    text: {
      color,
      textTransform,

      margin: 0,
      height: 'auto',
      padding: 0,

      fontSize: toDpFromPixel(22),
      fontFamily: 'Inter-Bold',
      fontWeight: '700',
      lineHeight: toDpFromPixel(26),
    },
  });

export type TitleProps = Pick<TextStyle, 'color' | 'textTransform'> & {
  /**
   * split the text in multiple lines
   * @default true
   */
  split?: boolean;
  children: string;
};

const Title: React.FC<TitleProps> = ({children, split = true, color, textTransform}) => {
  const style = useStyles({color, textTransform});

  if (!split) {
    return <Text style={style.text}>{children}</Text>;
  }

  return (
    <View style={style.root}>
      {children
        .trim()
        .split(/\s+/)
        .map(el => {
          return (
            <Text key={el} style={style.text}>
              {el}
            </Text>
          );
        })}
    </View>
  );
};

export default Title;
