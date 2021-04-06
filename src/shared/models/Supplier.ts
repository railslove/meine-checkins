export type SupplierCheckInItem = {
  id: string;
  url: string;
  stopTime?: Date;
  startTime?: Date;
};

export type SupplierCheckIn = Pick<SupplierCheckInItem, 'id' | 'url' | 'startTime'>;
export type SupplierCheckOut = Pick<SupplierCheckInItem, 'id' | 'url' | 'stopTime'>;
export type SupplierRegister = Pick<SupplierCheckInItem, 'id' | 'url'>;
