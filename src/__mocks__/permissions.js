import mockPermissions from 'react-native-permissions/mock';

jest.mock('react-native-permissions', () => mockPermissions);
jest.mock(
  'react-native-qrcode-scanner/node_modules/react-native-permissions',
  () => mockPermissions
);
