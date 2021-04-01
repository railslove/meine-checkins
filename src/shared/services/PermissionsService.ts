import {Platform} from 'react-native';
import {PERMISSIONS, check, request} from 'react-native-permissions';

export type PermissionResult = 'unavailable' | 'blocked' | 'denied' | 'granted' | 'limited';

const hasUserPermission = (result: PermissionResult) => {
  return result === 'limited' || result === 'granted' || false;
};
class PermissionsService {
  requestCamera(): Promise<{result: PermissionResult; hasPermission: boolean}> {
    const permissionValue =
      Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;

    return check(permissionValue).then(result => {
      const permission = hasUserPermission(result);

      if (permission) {
        return {result, hasPermission: true};
      }

      return request(permissionValue).then(result => {
        return {result, hasPermission: hasUserPermission(result)};
      });
    });
  }
}

export default new PermissionsService();
