import {createAction} from 'typesafe-actions';

import {CompletedCheckInItem, PartialCheckInItem} from 'src/shared/models/Provider';

export const providerRegisterAction = createAction('@provider/register')<
  Pick<PartialCheckInItem, 'url'>
>();

export const providerCheckInAction = createAction('@provider/check-in')<PartialCheckInItem>();
export const providerCheckOutAction = createAction('@provider/check-out')<CompletedCheckInItem>();

type ProviderSetLogoPayload = {
  item: PartialCheckInItem;
  logoUrl: string;
};

export const providerSetLogoAction = createAction('@provider/set-logo')<ProviderSetLogoPayload>();

export const providerDiscardAction = createAction(
  '@provider/check-in-discard'
)<PartialCheckInItem>();
