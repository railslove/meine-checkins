import {configureStore} from '@reduxjs/toolkit';
import {createEpicMiddleware} from 'redux-observable';

import {rootEpic} from 'src/shared/redux/effects/rootEpic';
import {AppAction} from 'src/shared/redux/actions/types';
import {rootReducer} from 'src/shared/redux/reducers/rootReducer';

export type StoreState = ReturnType<typeof rootReducer>;

// Redux observable
const epicMiddleware = createEpicMiddleware<AppAction, AppAction, StoreState>();

const store = configureStore({
  reducer: rootReducer,
  devTools: __DEV__,
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export default store;
