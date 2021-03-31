import {ThunkAction} from 'redux-thunk';
import {Action} from 'typesafe-actions';

import {StoreState} from 'src/shared/redux/store';

declare module 'redux' {
  export interface Dispatch {
    (action: Action): Action;
    <R>(thunkAction: ThunkAction<R, StoreState, void, Action>): R;
  }
}
