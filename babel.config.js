module.exports = {
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
        },
      },
    ],
  ],
};
