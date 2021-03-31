import {CheckInBegin, CheckInEnded, CheckInRegister} from 'src/shared/models/CheckIn';
import {createAction} from 'typesafe-actions';

export const checkInRegsiterAction = createAction(
  '@checkIn/register',
  (url: string): CheckInRegister => ({
    url,
  })
)();

export const checkInBeginAction = createAction(
  '@checkIn/start',
  (url: string): CheckInBegin => ({
    url,
    startTime: new Date(),
  })
)();

export const checkInEndedAction = createAction(
  '@checkIn/start',
  (url: string): CheckInEnded => ({
    url,
    stopTime: new Date(),
  })
)();
