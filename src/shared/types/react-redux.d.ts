import {Action} from 'typesafe-actions';
import {ThunkDispatch as ReduxThunkDispatch} from 'redux-thunk';

import {StoreState} from 'src/shared/redux/reducers';

declare module 'react-redux' {
  export interface DefaultRootState extends StoreState {}

  export interface ThunkDispatch extends ReduxThunkDispatch<StoreState, undefined, Action> {}

  export function useDispatch(): ThunkDispatch;
}
