import React from 'react';
import {StyleSheet, Text} from 'react-native';

const useStyles = ({color = '#060606'}: Omit<HeadlineProps, 'children'> = {}) =>
  StyleSheet.create({
    root: {
      color,
      margin: 0,
      height: 'auto',
      padding: 0,
      marginBottom: 14,

      fontSize: 22,
      fontFamily: 'Inter-Bold',
      fontWeight: '700',
      lineHeight: 26,
      textAlign: 'left',
    },
  });

export type HeadlineProps = {
  color?: string;
  children: React.ReactNode;
};

const Headline: React.FC<HeadlineProps> = ({children, color}) => {
  const style = useStyles({color});

  return <Text style={style.root}>{children}</Text>;
};

export default Headline;
