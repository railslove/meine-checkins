import React from 'react';

import {StyleSheet, Image as RNImage, ImageProps as RNImageProps} from 'react-native';
import Box from 'src/shared/components/Layout/Box';

const style = StyleSheet.create({
  root: {
    maxWidth: '90%',
    maxHeight: '100%',
  },
});

export type ImageProps = RNImageProps;

const Image: React.FC<ImageProps> = props => (
  <Box maxHeight="50%" display="flex" alignItems="center" justifyContent="center">
    <RNImage style={style.root} resizeMode="contain" {...props} />
  </Box>
);

export default Image;
