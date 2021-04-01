import {Dispatch} from 'redux';
import {initializeAppAction} from 'src/shared/redux/actions/appActions';
import UserService from 'src/shared/services/UserService';

export const initializeAppThunk = () => (dispatch: Dispatch) => {
  dispatch(initializeAppAction.request());

  return UserService.getUser()
    .then(user => {
      const result = {user};
      dispatch(initializeAppAction.success(result));
      return result;
    })
    .catch(error => {
      dispatch(initializeAppAction.failure({error}));
      return undefined;
    });
};
