import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {toDpFromPixel} from 'src/shared/theme/util';

const style = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: toDpFromPixel(14),
  },
  text: {
    color: '#060606',
    margin: 0,
    height: 'auto',
    padding: 0,

    fontSize: toDpFromPixel(36),
    lineHeight: toDpFromPixel(44),
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
            <Text key={el} style={style.text}>
              {el}
            </Text>
          );
        })}
    </View>
  );
};

export default Headline;
