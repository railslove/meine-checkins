import CheckIn from 'src/shared/models/CheckIn';
import {createAction} from 'typesafe-actions';

export const checkInStopAction = createAction(
  '@checkIn/stop',
  (url: string): CheckIn => ({
    time: Date.now(),
    url,
  })
)();

export const checkInStartAction = createAction(
  '@checkIn/start',
  (url: string): CheckIn => ({
    time: Date.now(),
    url,
  })
)();
