import {createAction} from 'typesafe-actions';

import {getUUID} from 'src/shared/models/util';
import {ProviderRegister, ProviderCheckInItem} from 'src/shared/models/Provider';

export const providerRegisterAction = createAction(
  '@provider/register',
  (payload: Pick<ProviderRegister, 'url' | 'name'>): ProviderCheckInItem => ({
    id: getUUID(),
    ...payload,
    stopTime: undefined,
    startTime: undefined,
  })
)();

export const providerCheckInAction = createAction(
  '@provider/check-in',
  (payload: ProviderRegister): ProviderCheckInItem => ({
    ...payload,
    stopTime: undefined,
    startTime: Date.now(),
  })
)();

export const providerCheckOutAction = createAction(
  '@provider/check-out',
  (payload: ProviderRegister): ProviderCheckInItem => ({
    ...payload,
    stopTime: Date.now(),
  })
)();
