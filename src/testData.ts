import faker from 'faker';

import {getUUID} from 'src/shared/models/util';
import {ProviderCheckInItem} from 'src/shared/models/Provider';

export const getProviderCheckInItemMock = (
  props: Partial<ProviderCheckInItem> = {}
): ProviderCheckInItem => {
  return {
    id: getUUID(),
    name: faker.company.companyName(),
    logoUrl: faker.image.nightlife(),
    startTime: faker.date.soon().getTime(),
    checkInUrl: faker.internet.url(),
    checkOutUrl: faker.internet.url(),
    ...props,
  };
};

export const TEST_PROVIDER = getProviderCheckInItemMock({
  // url: 'https://check-in-provider.vercel.app',
  name: 'recover',
  checkInUrl:
    'https://rcvr.app/checkin?a=8c2bb0ea-5a6c-4219-8a6d-428f245d7aa7&k=LeDTVuNGteBiKoGmZH9jN%2FmQNuphhcg%2FksroGKnAGmw%3D',
});