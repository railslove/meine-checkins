import {Platform} from 'react-native';
import {PERMISSIONS, check, request} from 'react-native-permissions';

export type PermissionResult = 'unavailable' | 'blocked' | 'denied' | 'granted' | 'limited';

class PermissionsService {
  requestCamera(): Promise<PermissionResult> {
    const permissionValue =
      Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;

    return check(permissionValue).then(result => {
      switch (result) {
        case 'denied':
        case 'limited':
        case 'granted': {
          return result;
        }
        default: {
          return request(permissionValue);
        }
      }
    });
  }
}

export default new PermissionsService();
