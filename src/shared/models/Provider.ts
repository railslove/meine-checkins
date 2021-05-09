import {ImageSourcePropType} from 'react-native';

export type CheckInProvider = {
  name: string;
  logoUrl: string | ImageSourcePropType;
  hostname: string;
};

export type ProviderCheckInItem = {
  id: string;
  url: string;
  name?: string;
  logoUrl?: string | ImageSourcePropType;
  stopTime?: number;
  startTime?: number;
};

export type ProviderRegister = Omit<ProviderCheckInItem, 'startTime' | 'stopTime'>;

export type ProviderCheckIn = ProviderRegister & Pick<ProviderCheckInItem, 'startTime'>;
export type ProviderCheckOut = ProviderRegister &
  Pick<ProviderCheckInItem, 'startTime' | 'stopTime'>;
