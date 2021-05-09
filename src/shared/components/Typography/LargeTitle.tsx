import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {px2dp} from 'src/shared/styles/createStyles';

const style = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: px2dp(14),
  },
  text: {
    color: '#060606',
    margin: 0,
    height: 'auto',
    padding: 0,

    fontSize: px2dp(36),
    lineHeight: px2dp(44),
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
