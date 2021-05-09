import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {toDpFromPixel} from 'src/shared/styles/util';

const useStyles = ({
  color = '#060606',
  fontWeight = '600',
  textTransform,
}: Omit<SubtitleProps, 'children'> = {}) =>
  StyleSheet.create({
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      marginBottom: toDpFromPixel(14),
    },
    text: {
      color,
      fontWeight,
      textTransform,

      margin: 0,
      height: 'auto',
      padding: 0,

      fontFamily: 'Inter-Bold',

      fontSize: toDpFromPixel(12),
      lineHeight: toDpFromPixel(18),
    },
  });

export type SubtitleProps = Pick<TextStyle, 'color' | 'fontWeight' | 'textTransform'> & {
  children: string;
};

const SubTitle: React.FC<SubtitleProps> = ({children, ...styleProps}) => {
  const style = useStyles(styleProps);

  return <Text style={style.text}>{children}</Text>;
};

export default SubTitle;
