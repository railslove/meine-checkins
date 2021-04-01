import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {toDpFromPixel} from 'src/shared/theme/util';

const useStyles = ({color = '#060606'}: Omit<TitleProps, 'children'> = {}) =>
  StyleSheet.create({
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      marginBottom: toDpFromPixel(14),
    },
    text: {
      color,
      margin: 0,
      height: 'auto',
      padding: 0,

      fontSize: toDpFromPixel(22),
      fontFamily: 'Inter-Bold',
      fontWeight: '700',
      lineHeight: toDpFromPixel(26),
    },
  });

export type TitleProps = {
  color?: string;
  children: string;
};

const Title: React.FC<TitleProps> = ({children, color}) => {
  const style = useStyles({color});

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
