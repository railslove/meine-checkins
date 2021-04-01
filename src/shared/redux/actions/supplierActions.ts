import {createAction} from 'typesafe-actions';
import {SupplierRegister, SupplierCheckIn, SupplierCheckOut} from 'src/shared/models/Supplier';

export const supplierRegisterAction = createAction(
  '@provider/register',
  (url: string): SupplierRegister => ({
    url,
  })
)();

export const supplierCheckInAction = createAction(
  '@provider/check-in',
  (url: string): SupplierCheckIn => ({
    url,
    startTime: new Date(),
  })
)();

export const supplierCheckOutAction = createAction(
  '@provider/check-out',
  (url: string): SupplierCheckOut => ({
    url,
    stopTime: new Date(),
  })
)();
