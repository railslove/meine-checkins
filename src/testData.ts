import {createPartialCheckIn} from 'src/shared/models/Provider';

export const TEST_PROVIDERS = [
  'https://guest.zzeus.de/#/KQ9C',
  'https://check-in-provider.vercel.app',
  'https://pandasafe.app/15f42fb481fc2d',
  'https://gastident.de/check-in/spotar',
  'https://app.visito.me/checkin/to/1000',
  'https://checkin.bevent.io/12603/IN/41420/37',
  'https://meldeapp.shapefruit.de/checkin/8a3f8d',
  'https://checkin.smartmeeting.online/checkin/tenant/da-michele',
  'https://checkin.checkincode.de/enter-data/ObIvTHWDFUx03vI5PKhn',
  'https://visits-dev.perkiot.com/entry/9b2b0c5f-259c-438b-e0bc-08d8de26c0ad',
  'https://rcvr.app/checkin?a=62751e22-84fd-4abc-9c6f-a3dc37587fb2&k=VIUBpH2nsGQeHf4dVEzJiQ4rzYZcHwZhvMxkMWtc9Cc%3D',
  // 'https://rcvr.app/checkin?a=8c2bb0ea-5a6c-4219-8a6d-428f245d7aa7&k=LeDTVuNGteBiKoGmZH9jN%2FmQNuphhcg%2FksroGKnAGmw%3D',
].map(url => createPartialCheckIn({url}));
