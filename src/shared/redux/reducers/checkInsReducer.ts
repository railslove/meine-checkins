import {createReducer} from 'typesafe-actions';

import {getProviderCheckInItemMock} from 'src/constants';
import {ProviderCheckInItem} from 'src/shared/models/Provider';

import {
  providerRegisterAction,
  providerCheckInAction,
  providerCheckOutAction,
} from 'src/shared/redux/actions/providerActions';

export type CheckInsInitialState = {
  error?: Error;
  items: ProviderCheckInItem[];
  current?: ProviderCheckInItem;
};

export const getCheckInsInitialState = (): CheckInsInitialState => ({
  items: [],
  error: undefined,
  current: undefined,
});

const checkInsReducer = createReducer(getCheckInsInitialState())
  .handleAction(providerRegisterAction, (state, {payload}) => {
    return {
      ...state,
      current: payload,
    };
  })
  .handleAction(providerCheckInAction, (state, {payload}) => {
    return {
      ...state,
      current: payload,
    };
  })
  .handleAction(providerCheckOutAction, (state, {payload: provider}) => {
    const id = provider.id;

    return {
      ...state,
      current: undefined,
      items: state.items.map(el => {
        return el.id === id ? provider : el;
      }),
    };
  });

export default checkInsReducer;
