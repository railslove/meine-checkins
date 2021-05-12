import React from 'react';
import {StyleSheet} from 'react-native';
import {Paragraph as RPParagraph} from 'react-native-paper';
import {toDpFromPixel} from 'src/shared/theme/util';

export const paragraphStyle = StyleSheet.create({
  root: {
    margin: 0,
    padding: 0,
    height: 'auto',
    fontSize: toDpFromPixel(12),
    lineHeight: toDpFromPixel(18),
    fontFamily: 'Inter-Regular',
  },
});

export type ParagraphProps = {
  children: React.ReactNode;
};

const Paragraph: React.FC<ParagraphProps> = ({children}) => {
  return <RPParagraph style={paragraphStyle.root}>{children}</RPParagraph>;
};

export default Paragraph;
