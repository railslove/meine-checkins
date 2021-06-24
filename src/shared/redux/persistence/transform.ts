import {createTransform} from 'redux-persist';
import {EXTRACT_HOSTNAME_RE} from 'src/shared/models/Provider';
import {ReduxPersistTransform} from 'src/shared/redux/persistence/types';

import {
  CheckInsReducerState,
  getCheckInsInitialState,
} from 'src/shared/redux/reducers/checkInsReducer';

import {getUserInitialState, UserReducerState} from 'src/shared/redux/reducers/userReducer';
import CHECK_IN_PROVIDER_LIST from 'src/shared/services/checkInProvidersList';

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
    /**
     * map existing check-ins for their actualized values (logo, etc.)
     */
    items: value.items.map(el => {
      const name = el.url.replace(EXTRACT_HOSTNAME_RE, '');
      const item = CHECK_IN_PROVIDER_LIST.find(el => name && el.hostname.test(name));

      if (item) {
        return {
          ...el,
          ...item,
        };
      }

      return el;
    }),
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
