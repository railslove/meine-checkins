import User from 'src/shared/models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ASYNC_STORAGE_KEY = `masterCheckingApp:user`;

class UserService {
  saveUser(user: User) {
    return AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(user)).then(() => user);
  }
  async getUser() {
    const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);

    if (!value) {
      return;
    }

    try {
      const userData: object = JSON.parse(value);

      if (this.isValidUser(userData)) {
        return userData as User;
      }
    } catch (error) {
      console.warn(error);
      return;
    }
  }

  isValidUser(value: object): boolean {
    const isInvalid = Object.entries(value).some(([key, value]) => {
      switch (key) {
        case 'address':
        case 'lastName':
        case 'firstName':
        case 'phoneNumber': {
          return typeof value !== 'string';
        }
        default: {
          return true;
        }
      }
    });

    return isInvalid === false;
  }
}

export default new UserService();
