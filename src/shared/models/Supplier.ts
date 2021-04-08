export type ProviderCheckInItem = {
  id: string;
  url: string;
  name: string;
  logoUrl?: string;
  stopTime?: number;
  startTime?: number;
};

export type ProviderRegister = Pick<ProviderCheckInItem, 'id' | 'url' | 'name' | 'logoUrl'>;

export type ProviderCheckIn = ProviderRegister & Pick<ProviderCheckInItem, 'startTime'>;
export type ProviderCheckOut = ProviderRegister & Pick<ProviderCheckInItem, 'stopTime'>;
