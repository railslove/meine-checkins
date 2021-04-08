export type ProviderCheckInItem = {
  id: string;
  name: string;
  logoUrl: string;
  checkInUrl: string;
  checkOutUrl: string;
  stopTime?: number;
  startTime?: number;
};

export type ProviderRegister = Omit<ProviderCheckInItem, 'startTime' | 'stopTime'>;

export type ProviderCheckIn = ProviderRegister & Pick<ProviderCheckInItem, 'startTime'>;
export type ProviderCheckOut = ProviderRegister & Pick<ProviderCheckInItem, 'stopTime'>;
