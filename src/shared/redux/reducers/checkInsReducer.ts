import {createReducer} from 'typesafe-actions';

import {ProviderCheckInItem} from 'src/shared/models/Provider';

import {
  providerRegisterAction,
  providerCheckInAction,
  providerCheckOutAction,
} from 'src/shared/redux/actions/providerActions';

export type CheckInsReducerState = {
  error?: Error;
  items: ProviderCheckInItem[];
  current?: ProviderCheckInItem;
};

export const getCheckInsInitialState = (
  initialState: Partial<CheckInsReducerState> = {}
): CheckInsReducerState => ({
  items: [],
  error: undefined,
  current: undefined,
  ...initialState,
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
    return {
      ...state,
      current: undefined,
      items: state.items.concat(provider),
    };
  });

export default checkInsReducer;
