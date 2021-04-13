module.exports = {
  // haste: {defaultPlatform: 'ios', platforms: ['android', 'ios', 'native']},
  preset: 'react-native',
  verbose: true,
  testRegex: ['.*\\.test\\.tsx?$'],
  setupFiles: ['<rootDir>/src/__mocks__/index.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '^src/(.*)': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!native-base)/',
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation/.*)',
  ],
};
