import {createPartialCheckIn} from 'src/shared/models/Provider';

export const TEST_PROVIDERS = [
  'https://check-in-provider.vercel.app',
  'https://pandasafe.app/15f42fb481fc2d',
  'https://gastident.de/check-in/spotar',
  'https://checkin.bevent.io/12603/IN/41420/37',
  'https://checkin.checkincode.de/enter-data/ObIvTHWDFUx03vI5PKhn',
  'https://visits-dev.perkiot.com/entry/9b2b0c5f-259c-438b-e0bc-08d8de26c0ad',
  'https://rcvr.app/checkin?a=8c2bb0ea-5a6c-4219-8a6d-428f245d7aa7&k=LeDTVuNGteBiKoGmZH9jN%2FmQNuphhcg%2FksroGKnAGmw%3D',
].map(url => createPartialCheckIn({url}));
