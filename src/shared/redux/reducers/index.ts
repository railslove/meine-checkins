import {combineReducers} from 'redux';

import user from './userReducer';
import checkIns from './checkInsReducer';

export const reducers = {
  user,
  checkIns,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
