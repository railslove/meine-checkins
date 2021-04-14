import {createReducer} from 'typesafe-actions';
import {} from 'redux-persist';

import User from 'src/shared/models/User';
import {saveUserAction} from 'src/shared/redux/actions/userActions';

export type UserReducerState = {
  item?: User;
};

export const getUserInitialState = (
  initialState: Partial<UserReducerState> = {}
): UserReducerState => ({
  ...initialState,
});

const userReducer = createReducer(getUserInitialState()).handleAction(
  saveUserAction,
  (state, {payload: {user}}) => ({
    ...state,
    item: user,
  })
);

export default userReducer;
