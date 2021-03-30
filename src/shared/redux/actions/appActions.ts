import {createAsyncAction} from 'typesafe-actions';

export const initializeAppAction = createAsyncAction(
  '@app/init/request',
  '@app/init/success',
  '@app/init/failure'
)<undefined, undefined, Error>();
