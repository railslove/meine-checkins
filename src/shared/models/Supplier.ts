export type SupplierCheckInItem = {
  url: string;
  stopTime?: Date;
  startTime?: Date;
};

export type SupplierCheckIn = Pick<SupplierCheckInItem, 'url' | 'startTime'>;
export type SupplierCheckOut = Pick<SupplierCheckInItem, 'url' | 'stopTime'>;
export type SupplierRegister = Pick<SupplierCheckInItem, 'url'>;
