import {createReducer} from 'typesafe-actions';

import {PermissionResult} from 'src/shared/services/PermissionsService';
import {requestCameraPermissionAction} from 'src/shared/redux/actions/permissionActions';

export enum Device {
  camera = 'camera',
}

export type PermissionValue = {
  device: Device;
  result: PermissionResult;
  hasPermission: boolean;
};

export type PermissionsReducerState = {
  error?: Error;
  items?: PermissionValue[];
  isLoading: boolean;
};

export const getPermissionsInitialState = (): PermissionsReducerState => ({
  error: undefined,
  isLoading: false,
});

const userReducer = createReducer(getPermissionsInitialState())
  .handleAction(requestCameraPermissionAction.request, state => {
    return {
      ...state,
      isLoading: true,
    };
  })
  .handleAction(requestCameraPermissionAction.success, (state, {payload: {result}}) => {
    return {
      ...state,
      item: (state.items || [])
        .filter(el => el.device !== Device.camera)
        .concat({
          result,
          device: Device.camera,
          hasPermission: result === 'granted' || result === 'limited',
        }),
      isLoading: false,
    };
  });

export default userReducer;
