export type ProviderCheckInItem = {
  id: string;
  url: string;
  name?: string;
  logoUrl?: string;
  stopTime?: number;
  startTime?: number;
};

export type ProviderRegister = Omit<ProviderCheckInItem, 'startTime' | 'stopTime'>;

export type ProviderCheckIn = ProviderRegister & Pick<ProviderCheckInItem, 'startTime'>;
export type ProviderCheckOut = ProviderRegister & Pick<ProviderCheckInItem, 'stopTime'>;
