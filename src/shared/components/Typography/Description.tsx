import React from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import {Paragraph as RPParagraph} from 'react-native-paper';
import {toDpFromPixel} from 'src/shared/styles/util';

const useStyles = ({
  color = 'black',
  textAlign = 'left',
}: Omit<DescriptionProps, 'children'> = {}) =>
  StyleSheet.create({
    root: {
      color,
      textAlign,

      margin: 0,
      padding: 0,
      height: 'auto',
      fontSize: toDpFromPixel(14),
      lineHeight: toDpFromPixel(22),
      fontFamily: 'Inter-Regular',
    },
  });

export type DescriptionProps = {
  children: React.ReactNode;
} & Pick<TextStyle, 'color' | 'textAlign'>;

const Description: React.FC<DescriptionProps> = ({children, ...styleProps}) => {
  const style = useStyles(styleProps);
  return <RPParagraph style={style.root}>{children}</RPParagraph>;
};

export default Description;
