import {combineReducers} from 'redux';

import userReducer from 'src/shared/redux/reducers/userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
});

export type RootStoreType = ReturnType<typeof rootReducer>;
