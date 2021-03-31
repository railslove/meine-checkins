import {Device} from 'src/shared/redux/reducers/permissionsReducer';
import {StoreState} from 'src/shared/redux/store';

export const cameraPermissionSelector = (state: StoreState) => {
  const cameraPermissions = state.permissions.items?.find(el => el.device === Device.camera);
  return cameraPermissions?.hasPermission;
};
