import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {AppAction} from 'src/shared/redux/actions/types';
import * as reducers from 'src/shared/redux/reducers';

const rootReducer = combineReducers(reducers);

export type StoreState = ReturnType<typeof rootReducer>;
export type StoreDispatch = ThunkDispatch<StoreState, undefined, AppAction>;

console.log('__DEV__', __DEV__);

const store = configureStore({
  reducer: rootReducer,
  devTools: __DEV__,
  middleware: [thunkMiddleware],
});

export default store;
