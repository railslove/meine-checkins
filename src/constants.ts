import faker from 'faker';
import {ProviderCheckInItem} from 'src/shared/models/Supplier';

export const getUUID = () => Math.random().toString(32).slice(2);

export const getProviderCheckInItemMock = (
  props: Partial<ProviderCheckInItem> = {}
): ProviderCheckInItem => ({
  id: getUUID(),
  url: faker.internet.url(),
  name: faker.company.companyName(),
  logoUrl: faker.image.nightlife(),
  startTime: faker.date.soon().getTime(),
  ...props,
});

export const TEST_PROVIDER = getProviderCheckInItemMock({
  // url: 'https://check-in-provider.vercel.app',
  url:
    'https://rcvr.app/checkin?a=8c2bb0ea-5a6c-4219-8a6d-428f245d7aa7&k=LeDTVuNGteBiKoGmZH9jN%2FmQNuphhcg%2FksroGKnAGmw%3D',
  name: 'recover',
});
