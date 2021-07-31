import React from 'react';
import {View} from 'react-native';

import createStyles, {px2dp} from 'src/shared/styles/createStyles';
import BaseText from './BaseText';

const style = createStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: 14,
  },
  text: {
    color: '#060606',
    margin: 0,
    height: 'auto',
    padding: 0,

    fontSize: 36,
    lineHeight: 44,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
});

export type LargeTitleProps = {
  children: string;
};

const Headline: React.FC<LargeTitleProps> = ({children}) => {
  return (
    <View style={style.root}>
      {children
        .trim()
        .split(/\s+/)
        .map(el => {
          return (
            <BaseText key={el} style={style.text}>
              {el}
            </BaseText>
          );
        })}
    </View>
  );
};

export default Headline;
