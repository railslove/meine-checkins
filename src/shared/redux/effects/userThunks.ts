import {Dispatch} from 'redux';
import {saveUserAction, SaveUserAction} from 'src/shared/redux/actions/userActions';

import UserService from 'src/shared/services/UserService';

export const saveUserThunk = (payload: SaveUserAction['request']) => (dispatch: Dispatch) => {
  dispatch(saveUserAction.request(payload));

  return UserService.saveUser(payload.user)
    .then(user => {
      dispatch(saveUserAction.success({user}));
      return user;
    })
    .catch(error => {
      dispatch(saveUserAction.failure({error}));
      return payload;
    });
};
