import React from 'react';
import {StyleSheet} from 'react-native';
import {Paragraph as RPParagraph} from 'react-native-paper';

const style = StyleSheet.create({
  root: {
    margin: 0,
    padding: 0,
    height: 'auto',
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    flexWrap: 'wrap',
  },
});

export type DescriptionProps = {
  children: React.ReactNode;
};

const Description: React.FC<DescriptionProps> = ({children}) => {
  return <RPParagraph style={style.root}>{children}</RPParagraph>;
};

export default Description;
