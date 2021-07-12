import {ImageSourcePropType} from 'react-native';

import {getUUID} from 'src/shared/models/util';
import CHECK_IN_PROVIDER_LIST from 'src/shared/services/checkInProvidersList';

export type TempProviderCheckIn = Partial<{
  url: string;
  isTrusted: boolean;
  isQRCodeURL: boolean;
}>;

export type CheckInProvider = {
  name: string;
  logoUrl: string | ImageSourcePropType;
  hostname: string;
};

export type PartialCheckInItem = {
  id: string;
  url: string;
  name: string;
  scanTime: number;
} & Partial<{
  logoUrl: string | ImageSourcePropType;
  logoLarge: string | ImageSourcePropType;
  location: string;
  stopTime: number;
  startTime: number;
}>;

export type CompletedCheckInItem = PartialCheckInItem & {
  stopTime: number;
  startTime: number;
};

export const EXTRACT_HOSTNAME_RE = /^https?\:\/\/|\/[^\s]+$/g;

export const isTrustedProvider = (url: string) => {
  const hostname = url.replace(EXTRACT_HOSTNAME_RE, '');
  return CHECK_IN_PROVIDER_LIST.some(el => el.hostname.test(hostname));
};

export const hasCheckInItemTimedOut = (item: PartialCheckInItem) => {
  const now = Date.now();
  const limit = now - 24 * 3600 * 1e3;

  return item.scanTime <= limit;
};

export const createPartialCheckIn = (
  props: Pick<PartialCheckInItem, 'url'>
): PartialCheckInItem => {
  const id = getUUID();
  const name = props.url.replace(EXTRACT_HOSTNAME_RE, '');
  const item = CHECK_IN_PROVIDER_LIST.find(el => name && el.hostname.test(name));
  const scanTime = Date.now();

  if (item) {
    return {
      id,
      ...props,
      ...item,
      scanTime,
    };
  }

  return {
    id,
    name,
    ...props,
    scanTime,
  };
};

export type PersitedCheckInItem = PartialCheckInItem | CompletedCheckInItem;

/**
 * map existing check-ins for their actualized values (logo, etc.)
 */
export const hydrateCheckInItem = (props: PersitedCheckInItem): PersitedCheckInItem => {
  const name = props.url.replace(EXTRACT_HOSTNAME_RE, '');
  const item = CHECK_IN_PROVIDER_LIST.find(el => name && el.hostname.test(name));

  if (item) {
    return {
      ...props,
      ...item,
    };
  }

  return props;
};
