jest.mock('react-native-get-random-values', () => ({
  getRandomBase64: jest.fn(),
}));
