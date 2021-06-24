import {createAction} from 'typesafe-actions';

import {CompletedCheckInItem, PartialCheckInItem} from 'src/shared/models/Provider';

export const providerRegisterAction = createAction('@provider/register')<
  Pick<PartialCheckInItem, 'url'>
>();

export const providerCheckInAction = createAction('@provider/check-in')<PartialCheckInItem>();
export const providerCheckOutAction = createAction('@provider/check-out')<
  Omit<CompletedCheckInItem, 'stopTime'>
>();

type ProviderSetLogoPayload = {
  item: PartialCheckInItem;
  logoUrl: string;
};

export const providerSetLogoAction = createAction('@provider/set-logo')<ProviderSetLogoPayload>();

type ProviderSetLocationPayload = {
  item: PartialCheckInItem;
  location: string;
};

export const providerSetLocationAction = createAction(
  '@provider/set-location'
)<ProviderSetLocationPayload>();

export const providerStopAction = createAction('@provider/check-in-stop')();

export const providersCleardAction = createAction('@provider/clear')();
