import {PersistConfig} from 'redux-persist/es/types';
import {StoreState, StoreStateKey} from 'src/shared/redux/reducers';

export type ReduxPersistTransform<K extends StoreStateKey, S extends StoreState[K]> = {
  /**
   * to which reducers should be applied
   */
  config: {
    blacklist?: K[];
    whitelist?: K[];
  };
  /**
   * transform state on its way to being serialized and persisted.
   */
  serialize: (input: S) => S;
  /**
   * transform state being rehydrated
   */
  rehydrate: (input: S) => S;
};

export type ReduxPersistConfig = Omit<PersistConfig<StoreState>, 'whitelist' | 'blacklist'> & {
  whitelist: StoreStateKey[];
  blacklist?: StoreStateKey[];
};
