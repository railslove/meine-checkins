import User from 'src/shared/models/User';
import {createAsyncAction} from 'typesafe-actions';

export type InitializeAppAction = {
  request: void;
  success: {
    user?: User;
  };
  failure: {
    error: Error;
  };
};

export const initializeAppAction = createAsyncAction(
  '@app/init/request',
  '@app/init/success',
  '@app/init/failure'
)<InitializeAppAction['request'], InitializeAppAction['success'], InitializeAppAction['failure']>();
