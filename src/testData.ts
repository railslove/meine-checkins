import {createPartialCheckIn} from 'src/shared/models/Provider';

// const TEST_PROVIDER_URL = 'https://check-in-provider.vercel.app';
const TEST_PROVIDER_URL =
  'https://rcvr.app/checkin?a=8c2bb0ea-5a6c-4219-8a6d-428f245d7aa7&k=LeDTVuNGteBiKoGmZH9jN%2FmQNuphhcg%2FksroGKnAGmw%3D';

// const TEST_PROVIDER_URL = 'https://checkin.checkincode.de/enter-data/ObIvTHWDFUx03vI5PKhn';
// const TEST_PROVIDER_URL = 'https://checkin.bevent.io/12603/IN/41420/37';
// const TEST_PROVIDER_URL =
//   'https://visits-dev.perkiot.com/entry/9b2b0c5f-259c-438b-e0bc-08d8de26c0ad';
// const TEST_PROVIDER_URL = 'https://pandasafe.app/15f42fb481fc2d';
// const TEST_PROVIDER_URL = 'https://gastident.de/check-in/spotar';

export const TEST_PROVIDER = createPartialCheckIn({
  // url: 'https://check-in-provider.vercel.app',
  url: TEST_PROVIDER_URL,
});
