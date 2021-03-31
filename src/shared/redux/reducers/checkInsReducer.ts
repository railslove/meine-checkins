import {createReducer} from 'typesafe-actions';

import CheckIn from 'src/shared/models/CheckIn';
import {checkInStartAction} from 'src/shared/redux/actions/checkInActions';

export type CheckInsInitialState = {
  error?: Error;
  items: CheckIn[];
  isLoading: boolean;
};

export const getCheckInsInitialState = (): CheckInsInitialState => ({
  error: undefined,
  items: [],
  isLoading: false,
});

const checkInsReducer = createReducer(getCheckInsInitialState()).handleAction(
  checkInStartAction,
  (state, {payload}) => {
    return {
      ...state,
      items: state.items.concat(payload),
    };
  }
);
export default checkInsReducer;
