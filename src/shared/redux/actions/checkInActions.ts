import CheckIn from 'src/shared/models/CheckIn';
import {createAction} from 'typesafe-actions';

export const checkInStopAction = createAction(
  '@checkIn/stop',
  (url: string): CheckIn => ({
    url,
    stopTime: Date.now(),
  })
)();

export const checkInStartAction = createAction(
  '@checkIn/start',
  (url: string): CheckIn => ({
    url,
    startTime: Date.now(),
  })
)();
