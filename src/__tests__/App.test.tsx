import 'react-native';
import React from 'react';
import App from 'src/main';
import {render} from '@testing-library/react-native';

describe('App', () => {
  it('renders without crashing', () => {
    const result = render(<App />);

    expect(result.container).toBeDefined();
  });
});
