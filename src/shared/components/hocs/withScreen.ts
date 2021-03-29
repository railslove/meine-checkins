import React from 'react';
import {createElement} from 'react-native';

function withScreen<P>(Component: React.FC<P>) {
  return (props: P) => createElement(Component, props);
}

export default withScreen;
