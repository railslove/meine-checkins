import {ImageSourcePropType} from 'react-native';

import {getUUID} from 'src/shared/models/util';
import CHECK_IN_PROVIDER_LIST from 'src/shared/services/checkInProvidersList';

export type CheckInProvider = {
  name: string;
  logoUrl: string | ImageSourcePropType;
  hostname: string;
};

export type PartialCheckInItem = {
  id: string;
  url: string;
  name: string;
  logoUrl?: string | ImageSourcePropType;
  startTime?: number;
};

export type CompletedCheckInItem = PartialCheckInItem & {
  stopTime: number;
  startTime: number;
};

export const EXTRACT_HOSTNAME_RE = /^https?\:\/\/|\/[^\s]+$/g;

export const createPartialCheckIn = (
  props: Pick<PartialCheckInItem, 'url'>
): PartialCheckInItem => {
  const id = getUUID();
  const name = props.url.replace(EXTRACT_HOSTNAME_RE, '');
  const item = CHECK_IN_PROVIDER_LIST.find(el => name && el.hostname.test(name));

  if (item) {
    return {
      id,
      ...props,
      ...item,
    };
  }

  return {
    id,
    name,
    ...props,
  };
};

/**
 * map existing check-ins for their actualized values (logo, etc.)
 */
export const createCompleteCheckIn = (props: CompletedCheckInItem) => {
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
