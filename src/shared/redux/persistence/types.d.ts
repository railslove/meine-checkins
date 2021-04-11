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
