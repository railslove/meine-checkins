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
} from 'src/shared/redux/actions/providerActions';
import {clearCachedWebView} from 'src/shared/components/WebView/CachedWebView';

export type CheckInsReducerState = {
  error?: Error;
  items: CompletedCheckInItem[];
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
  .handleAction(providerRegisterAction, (state, {payload}) => {
    return {
      ...state,
      current: createPartialCheckIn(payload),
    };
  })
  .handleAction(providerSetLogoAction, (state, {payload: {item, logoUrl}}) => {
    return {
      ...state,
      current: {
        ...item,
        logoUrl: item?.logoUrl || logoUrl,
      },
    };
  })
  .handleAction(providerCheckInAction, (state, {payload}) => {
    return {
      ...state,
      current: {
        ...payload,
        stopTime: undefined,
        startTime: Date.now(),
      },
    };
  })
  .handleAction(providerCheckOutAction, (state, {payload: item}) => {
    clearCachedWebView(item.id);

    return {
      ...state,
      current: undefined,
      items: [item].concat(state.items),
    };
  })
  .handleAction(providerDiscardAction, (state, {payload: {id}}) => {
    if (id) {
      clearCachedWebView(id);
    }

    return {
      ...state,
      current: undefined,
    };
  });

export default checkInsReducer;
