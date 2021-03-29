import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineEpics, createEpicMiddleware, Epic} from 'redux-observable';

import {userEpics} from 'src/shared/redux/slices/userSlice';
import {rootReducer, RootStoreType} from 'src/shared/redux/rootReducer';

// Redux observable
export type MyEpic = Epic<any, any, RootStoreType, any>;
export const rootEpic = combineEpics(...userEpics);
const epicMiddleware = createEpicMiddleware<any, any, RootStoreType, any>();

const store = configureStore({
  reducer: rootReducer,
  devTools: __DEV__,
  middleware: [epicMiddleware, ...getDefaultMiddleware()],
});

export type AppDispatch = typeof store.dispatch;

epicMiddleware.run(rootEpic);

export default store;
