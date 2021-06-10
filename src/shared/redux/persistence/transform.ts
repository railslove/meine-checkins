import {createTransform} from 'redux-persist';
import {createCompletedCheckIn} from 'src/shared/models/Provider';
import {ReduxPersistTransform} from 'src/shared/redux/persistence/types';

import {
  CheckInsReducerState,
  getCheckInsInitialState,
} from 'src/shared/redux/reducers/checkInsReducer';

import {getUserInitialState, UserReducerState} from 'src/shared/redux/reducers/userReducer';

/**
 * user transform
 */
const userTransform: ReduxPersistTransform<'user', UserReducerState> = {
  serialize: ({item}) => getUserInitialState({item}),
  rehydrate: value => value,
  config: {
    whitelist: ['user'],
  },
};

export const userPersistTransform = createTransform<UserReducerState, UserReducerState>(
  userTransform.serialize,
  userTransform.rehydrate,
  userTransform.config
);

/**
 * checkIns transform
 */
const checkInsTransform: ReduxPersistTransform<'checkIns', CheckInsReducerState> = {
  serialize: ({items}) => getCheckInsInitialState({items}),
  rehydrate: value => ({
    ...value,
    items: value.items.map(createCompletedCheckIn),
  }),
  config: {
    whitelist: ['checkIns'],
  },
};

export const checkInsPersistTransform = createTransform<CheckInsReducerState, CheckInsReducerState>(
  checkInsTransform.serialize,
  checkInsTransform.rehydrate,
  checkInsTransform.config
);
