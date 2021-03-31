import {Device} from 'src/shared/redux/reducers/permissionsReducer';
import {StoreState} from 'src/shared/redux/store';

export const cameraPermissionSelector = (state: StoreState) => {
  const item = state.permissions.items?.find(el => el.device === Device.camera);

  return item?.hasPermission;
};
