// import 'react-native/jest/setup';
import mockPermissions from 'react-native-permissions/mock';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('react-native-permissions', () => mockPermissions);
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
