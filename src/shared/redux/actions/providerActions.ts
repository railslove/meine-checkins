import {createAction} from 'typesafe-actions';

import {getUUID} from 'src/shared/models/util';
import {ProviderRegister, ProviderCheckInItem} from 'src/shared/models/Provider';
import CheckInProviderService from 'src/shared/services/CheckInProviderService';

export const providerRegisterAction = createAction(
  '@provider/register',
  (payload: Pick<ProviderRegister, 'url' | 'name' | 'logoUrl'>): ProviderCheckInItem =>
    CheckInProviderService.mapProviderValues({
      id: getUUID(),
      ...payload,
      stopTime: undefined,
      startTime: undefined,
    })
)();

export const providerSetLogoAction = createAction(
  '@provider/set-logo',
  (payload: ProviderCheckInItem): ProviderCheckInItem => payload
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
