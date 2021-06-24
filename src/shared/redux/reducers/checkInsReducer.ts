import {createReducer} from 'typesafe-actions';

import {
  CompletedCheckInItem,
  createPartialCheckIn,
  PartialCheckInItem,
} from 'src/shared/models/Provider';

import {
  providerRegisterAction,
  providerCheckInAction,
  providerCheckOutAction,
  providerSetLogoAction,
  providerDiscardAction,
  providerSetLocationAction,
  providersCleardAction,
} from 'src/shared/redux/actions/providerActions';

export type CheckInsReducerState = {
  error?: Error;
  items: (PartialCheckInItem | CompletedCheckInItem)[];
  current?: PartialCheckInItem;
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
  .handleAction(providersCleardAction, () => getCheckInsInitialState())
  .handleAction(providerRegisterAction, (state, {payload}) => {
    const current = createPartialCheckIn(payload);

    return {
      ...state,
      current,
      items: [current].concat(state.items),
    };
  })
  .handleAction(providerSetLogoAction, (state, {payload: {item, logoUrl}}) => {
    const id = item.id;
    const current = {
      ...item,
      logoUrl: item?.logoUrl || logoUrl,
    };
    return {
      ...state,
      current,
      items: state.items.map(el => (el.id === id ? current : el)),
    };
  })
  .handleAction(providerSetLocationAction, (state, {payload: {item, location}}) => {
    const id = item.id;
    const current = {
      ...item,
      location: item?.location || location,
    };

    return {
      ...state,
      current,
      items: state.items.map(el => (el.id === id ? current : el)),
    };
  })
  .handleAction(providerCheckInAction, (state, {payload: item}) => {
    const id = item.id;
    const current = {
      ...item,
      stopTime: undefined,
      startTime: Date.now(),
    };

    return {
      ...state,
      current,
      items: state.items.map(el => (el.id === id ? current : el)),
    };
  })
  .handleAction(providerCheckOutAction, (state, {payload}) => {
    const id = payload.id;
    const current: CompletedCheckInItem = {
      ...payload,
      stopTime: Date.now(),
    };

    return {
      ...state,
      items: state.items.map(el => (el.id === id ? current : el)),
      current: undefined,
    };
  })
  .handleAction(providerDiscardAction, state => {
    const id = state.current?.id;

    return {
      ...state,
      items: state.items.filter(el => el.id !== id),
      current: undefined,
    };
  });

export default checkInsReducer;
