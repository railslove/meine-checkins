import React from 'react';
import {Text, TextStyle} from 'react-native';
import createStyles from 'src/shared/styles/createStyles';

const useStyles = ({
  color = '#060606',
  fontWeight = '600',
  ...restTextStyles
}: Omit<SubtitleProps, 'children'> = {}) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      marginBottom: 14,
    },
    text: {
      color,
      fontWeight,

      margin: 0,
      height: 'auto',
      padding: 0,

      fontFamily: 'Inter-Bold',

      fontSize: 14,
      lineHeight: 18,

      ...restTextStyles,
    },
  });

export type SubtitleProps = TextStyle & {
  children: string;
};

const SubTitle: React.FC<SubtitleProps> = ({children, ...styleProps}) => {
  const style = useStyles(styleProps);

  return <Text style={style.text}>{children}</Text>;
};

export default SubTitle;
