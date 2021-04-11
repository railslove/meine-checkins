import {createReducer} from 'typesafe-actions';

import User from 'src/shared/models/User';
import {initializeAppAction} from 'src/shared/redux/actions/appActions';
import {saveUserAction} from 'src/shared/redux/actions/userActions';

export type UserReducerState = {
  item?: User;
  hasError: boolean;
  isLoading: boolean;
};

export const getUserInitialState = (): UserReducerState => ({
  hasError: false,
  isLoading: false,
});

const userReducer = createReducer(getUserInitialState())
  .handleAction([initializeAppAction.request, saveUserAction.request], state => {
    return {
      ...state,
      isLoading: true,
    };
  })
  .handleAction(
    [initializeAppAction.success, saveUserAction.success],
    (state, {payload: {user}}) => ({
      ...state,
      item: user,
      isLoading: false,
    })
  );

export default userReducer;
