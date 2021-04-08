import {createReducer} from 'typesafe-actions';

import {getProviderCheckInItemMock} from 'src/constants';
import {ProviderCheckInItem} from 'src/shared/models/Supplier';

import {
  providerRegisterAction,
  providerCheckInAction,
  providerCheckOutAction,
} from 'src/shared/redux/actions/supplierActions';

export type CheckInsInitialState = {
  error?: Error;
  items: ProviderCheckInItem[];
  current?: ProviderCheckInItem;
};

export const getCheckInsInitialState = (): CheckInsInitialState => ({
  items: [
    getProviderCheckInItemMock(),
    getProviderCheckInItemMock(),
    getProviderCheckInItemMock(),
    getProviderCheckInItemMock(),
  ],
  error: undefined,
  current: getProviderCheckInItemMock(),
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
      items: state.items.concat(payload),
    };
  })
  .handleAction(providerCheckOutAction, (state, {payload: supplier}) => {
    const id = supplier.id;

    return {
      ...state,
      current: undefined,
      items: state.items.map(el => {
        return el.id === id ? {...el, ...supplier} : el;
      }),
    };
  });

export default checkInsReducer;
