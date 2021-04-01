import React from 'react';

import {StyleSheet, Image as RNImage, ImageProps as RNImageProps} from 'react-native';

const style = StyleSheet.create({
  root: {
    maxWidth: '100%',
    maxHeight: '50%',
  },
});

export type ImageProps = RNImageProps;

const Image: React.FC<ImageProps> = props => (
  <RNImage style={style.root} resizeMode="center" {...props} />
);

export default Image;
