import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ofType} from 'redux-observable';
import {Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {RootStoreType} from 'src/shared/redux/rootReducer';
import {MyEpic} from 'src/shared/redux/store';

type UserReducer = {
  globalValue: 'PING' | 'PONG';
};

const initialState: UserReducer = {
  globalValue: 'PING',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ping: state => {
      state.globalValue = 'PING';
    },
    pong: state => {
      state.globalValue = 'PONG';
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

const initEpic: MyEpic = (action$: Observable<PayloadAction<undefined>>, state$: Observable<RootStoreType>) =>
  action$.pipe(
    ofType(userActions.ping.type, userActions.pong.type),
    withLatestFrom(state$),
    map(([_action, state]) => {
      console.log(`exampleEpic: I am reacting to ${state.user.globalValue}`);

      // Epics are a stream of actions-in, actions-out
      return {type: 'useless_action'};
    })
  );

export const userEpics = [initEpic];
