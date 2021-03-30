import React from 'react';
import {StyleSheet} from 'react-native';
import {Paragraph as RPParagraph} from 'react-native-paper';

const style = StyleSheet.create({
  root: {
    margin: 0,
    padding: 0,
    height: 'auto',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
});

export type ParagraphProps = {
  children: React.ReactNode;
};

const Paragraph: React.FC<ParagraphProps> = ({children}) => {
  return <RPParagraph style={style.root}>{children}</RPParagraph>;
};

export default Paragraph;
