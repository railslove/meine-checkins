import {Dispatch} from 'redux';
import {requestCameraPermissionAction} from 'src/shared/redux/actions/permissionActions';

import PermissionsService from 'src/shared/services/PermissionsService';

export const requestCamerPermissionThunk = () => (dispatch: Dispatch) => {
  dispatch(requestCameraPermissionAction.request());

  return PermissionsService.requestCamera()
    .then(result => {
      dispatch(requestCameraPermissionAction.success({result}));
      return result;
    })
    .catch(error => {
      dispatch(requestCameraPermissionAction.failure({error}));
      return undefined;
    });
};
