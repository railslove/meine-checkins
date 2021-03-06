import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';

// persistence
import {persistStore, persistReducer} from 'redux-persist';
import {
  userPersistTransform,
  checkInsPersistTransform,
} from 'src/shared/redux/persistence/transform';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// actions
import {AppAction} from 'src/shared/redux/actions/types';
import {ReduxPersistConfig} from 'src/shared/redux/persistence/types';
import rootReducer, {reducers} from 'src/shared/redux/reducers';
import {createSentryMiddleware} from 'src/shared/redux/middleware/sentry-middleware';

// type exports
export type StoreState = ReturnType<typeof rootReducer>;
export type StoreStateKey = keyof typeof reducers;
export type StoreDispatch = ThunkDispatch<StoreState, undefined, AppAction>;

// middleware
const middleware = [thunkMiddleware, createSentryMiddleware()];

// development middleware
if (__DEV__ && process.env.NODE_ENV != 'test') {
  const createDebugger = require('redux-flipper').default;
  middleware.push(createDebugger());
}

// persistence config
const persistRootReducerConfig: ReduxPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'checkIns'],
  transforms: [userPersistTransform, checkInsPersistTransform],
  stateReconciler: autoMergeLevel2,
};

// setup
export const store = configureStore({
  reducer: persistReducer(persistRootReducerConfig, rootReducer),
  devTools: __DEV__,
  middleware,
});

export const persistor = persistStore(store);
