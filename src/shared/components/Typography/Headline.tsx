import React from 'react';
import {StyleSheet, Text} from 'react-native';

const style = StyleSheet.create({
  root: {
    color: '#060606',
    margin: 0,
    height: 'auto',
    padding: 0,
    marginBottom: 14,

    fontSize: 34,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    lineHeight: 44,
  },
});

export type HeadlineProps = {
  children: React.ReactNode;
};

const Headline: React.FC<HeadlineProps> = ({children}) => {
  return <Text style={style.root}>{children}</Text>;
};

export default Headline;
