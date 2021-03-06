import {Action} from 'typesafe-actions';
import {ThunkDispatch as ReduxThunkDispatch} from 'redux-thunk';
import {StoreState} from 'src/shared/redux/reducers';

declare module 'redux-thunk' {
  export interface ThunkDispatch extends ReduxThunkDispatch<StoreState, undefined, Action> {}
}
