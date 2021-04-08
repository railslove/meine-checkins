import {createAction} from 'typesafe-actions';

import {getUUID} from 'src/shared/models/util';
import {ProviderRegister, ProviderCheckIn, ProviderCheckOut} from 'src/shared/models/Provider';

export const providerRegisterAction = createAction(
  '@provider/register',
  (payload: Omit<ProviderRegister, 'id'>): ProviderRegister => ({
    id: getUUID(),
    ...payload,
  })
)();

export const providerCheckInAction = createAction(
  '@provider/check-in',
  (payload: ProviderRegister): ProviderCheckIn => ({
    ...payload,
    startTime: Date.now(),
  })
)();

export const providerCheckOutAction = createAction(
  '@provider/check-out',
  (payload: ProviderRegister): ProviderCheckOut => ({
    ...payload,
    stopTime: Date.now(),
  })
)();
