import {PermissionResult} from 'src/shared/services/PermissionsService';

import {createAsyncAction} from 'typesafe-actions';

export type RequestCameraPermissionAction = {
  request: void;
  success: {
    result: PermissionResult;
  };
  failure: {
    error: Error;
  };
};

export const requestCameraPermissionAction = createAsyncAction(
  '@permission/camera/request',
  '@permission/camera/success',
  '@permission/camera/failure'
)<
  RequestCameraPermissionAction['request'],
  RequestCameraPermissionAction['success'],
  RequestCameraPermissionAction['failure']
>();
