import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {toDpFromPixel} from 'src/shared/theme/util';

const useStyles = ({color = '#060606'}: Omit<SubtitleProps, 'children'> = {}) =>
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

      fontFamily: 'Inter-Bold',
      fontWeight: '600',

      fontSize: toDpFromPixel(12),
      lineHeight: toDpFromPixel(17),
    },
  });

export type SubtitleProps = {
  color?: string;
  children: string;
};

const SubTitle: React.FC<SubtitleProps> = ({children, color}) => {
  const style = useStyles({color});

  return <Text style={style.text}>{children}</Text>;
};

export default SubTitle;
