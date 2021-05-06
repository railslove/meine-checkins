import {createReducer} from 'typesafe-actions';

import {ProviderCheckInItem} from 'src/shared/models/Provider';

import {
  providerRegisterAction,
  providerCheckInAction,
  providerCheckOutAction,
  providerSetLogoAction,
  providerDiscardAction,
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
  current: undefined,
  ...initialState,
  error: undefined,
});

const checkInsReducer = createReducer(getCheckInsInitialState())
  .handleAction(providerRegisterAction, (state, {payload}) => {
    return {
      ...state,
      current: payload,
    };
  })
  .handleAction(providerSetLogoAction, (state, {payload}) => {
    const {current} = state;

    return {
      ...state,
      current: current?.logoUrl == null ? payload : current,
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
      items: [provider].concat(state.items),
    };
  })
  .handleAction(providerDiscardAction, state => {
    return {
      ...state,
      current: undefined,
    };
  });
export default checkInsReducer;
