import React from 'react';
import {StyleSheet} from 'react-native';
import {Paragraph as RPParagraph} from 'react-native-paper';

const useStyles = ({color = 'black'}: Omit<DescriptionProps, 'children'> = {}) =>
  StyleSheet.create({
    root: {
      color,
      margin: 0,
      padding: 0,
      height: 'auto',
      fontSize: 14,
      lineHeight: 24,
      fontFamily: 'Inter-Regular',
    },
  });

export type DescriptionProps = {
  color?: string;
  children: React.ReactNode;
};

const Description: React.FC<DescriptionProps> = ({color, children}) => {
  const style = useStyles({color});
  return <RPParagraph style={style.root}>{children}</RPParagraph>;
};

export default Description;
