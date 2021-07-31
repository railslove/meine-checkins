import React from 'react';
import {StyleSheet} from 'react-native';
import {Paragraph as RPParagraph} from 'react-native-paper';

import {px2dp} from 'src/shared/styles/createStyles';

export const paragraphStyle = StyleSheet.create({
  root: {
    margin: 0,
    padding: 0,
    height: 'auto',
    fontSize: px2dp(13),
    lineHeight: px2dp(18),
    fontFamily: 'Inter-Regular',
  },
});

export type ParagraphProps = {
  children: React.ReactNode;
};

const Paragraph: React.FC<ParagraphProps> = ({children}) => {
  return (
    <RPParagraph style={paragraphStyle.root} allowFontScaling={false}>
      {children}
    </RPParagraph>
  );
};

export default Paragraph;
