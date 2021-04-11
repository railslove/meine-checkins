import 'react-native';
import React from 'react';
import App from 'src/main';
import {render} from '@testing-library/react-native';

import {sleep} from 'src/__tests__/testUtil';

describe('App', () => {
  it('renders without crashing', async () => {
    const result = render(<App />);

    // wait for redux-persist to setup
    await sleep(500);

    expect(result.container).toBeDefined();
  });
});
