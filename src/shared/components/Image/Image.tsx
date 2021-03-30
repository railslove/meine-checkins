import React from 'react';

import {StyleSheet, View, Image as RNImage, ImageProps as RNImageProps} from 'react-native';

const style = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
  },
});

export type ImageProps = RNImageProps;

const Image: React.FC<ImageProps> = props => (
  <View style={style.root}>
    <RNImage style={style.image} resizeMode="contain" {...props} />
  </View>
);

export default Image;
