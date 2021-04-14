import {combineReducers} from 'redux';

import user from './userReducer';
import checkIns from './checkInsReducer';

const reducers = {
  user,
  checkIns,
};

const rootReducer = combineReducers(reducers);

export type StoreState = ReturnType<typeof rootReducer>;
export type StoreStateKey = keyof typeof reducers;

export default rootReducer;
