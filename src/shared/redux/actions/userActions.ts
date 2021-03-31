import User from 'src/shared/models/User';
import {createAsyncAction} from 'typesafe-actions';

export type SaveUserAction = {
  request: {
    user: User;
  };
  success: {
    user: User;
  };
  failure: {
    error: Error;
  };
};

export const saveUserAction = createAsyncAction(
  '@user/save/request',
  '@user/save/success',
  '@user/save/failure'
)<SaveUserAction['request'], SaveUserAction['success'], SaveUserAction['failure']>();
