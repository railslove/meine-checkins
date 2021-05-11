import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {px2dp} from 'src/shared/styles/createStyles';

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
      marginBottom: px2dp(14),
    },
    text: {
      color,
      fontWeight,
      textTransform,

      margin: 0,
      height: 'auto',
      padding: 0,

      fontFamily: 'Inter-Bold',

      fontSize: px2dp(14),
      lineHeight: px2dp(18),
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
