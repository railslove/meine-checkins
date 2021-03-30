import {Epic} from 'redux-observable';

import {AppAction} from 'src/shared/redux/actions/types';
import {StoreState} from 'src/shared/store/store';

export type AppEpic<InAction = AppAction, OutAction = AppAction> = Epic<
  InAction,
  OutAction,
  StoreState
>;
