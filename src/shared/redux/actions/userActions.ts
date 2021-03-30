import User from 'src/shared/models/User';
import {createAsyncAction} from 'typesafe-actions';

export const saveUserAction = createAsyncAction(
  '@user/save/request',
  '@user/save/success',
  '@user/save/failure'
)<User, User, Error>();
