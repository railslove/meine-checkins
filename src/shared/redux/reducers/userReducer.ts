import {createReducer} from 'typesafe-actions';

import User from 'src/shared/models/User';
import {initializeAppAction} from 'src/shared/redux/actions/appActions';

export type UserReducerState = {
  item?: User;
  hasError: boolean;
  isLoading: boolean;
};

export const getUserInitialState = (): UserReducerState => ({
  hasError: false,
  isLoading: false,
});

const userReducer = createReducer(getUserInitialState()).handleAction(
  initializeAppAction.request,
  state => ({
    ...state,
    isLoading: true,
  })
);

export default userReducer;
