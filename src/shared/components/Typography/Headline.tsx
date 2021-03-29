import React from 'react';
import {StyleSheet, Text} from 'react-native';

const style = StyleSheet.create({
  root: {
    height: 'auto',
    fontSize: 34,
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
  },
});

export type HeadlineProps = {
  children: React.ReactNode;
};

const Headline: React.FC<HeadlineProps> = ({children}) => {
  return <Text style={style.root}>{children}</Text>;
};

export default Headline;
