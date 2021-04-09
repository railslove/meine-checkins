import 'src/__mocks__/gesture-handler';

import 'src/__mocks__/navigation';
import 'src/__mocks__/reanimated';

import 'src/__mocks__/permissions';
import 'src/__mocks__/async-storage';

jest.mock('react-native-get-random-values', () => ({
  getRandomBase64: jest.fn(),
}));
