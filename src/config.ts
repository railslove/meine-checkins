import {version} from '../package.json';

export const APP_ID = 'de.railslove.wfdcheckin';

export const RELEASE_VERSION = version;

export const WEBVIEW_DEFAULT_HEADERS = {
  'x-requested-with': APP_ID,
};

export const WEBVIEW_DEFAULT_QUERY_PARAMS = [
  {
    name: 'requestedWith',
    value: APP_ID,
  },
];
