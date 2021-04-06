import {createAction} from 'typesafe-actions';
import {SupplierRegister, SupplierCheckIn, SupplierCheckOut} from 'src/shared/models/Supplier';

export const supplierRegisterAction = createAction(
  '@provider/register',
  (url: string): SupplierRegister => ({
    id: Math.random().toString(32).slice(2),
    url,
  })
)();

export const supplierCheckInAction = createAction(
  '@provider/check-in',
  (payload: SupplierRegister): SupplierCheckIn => ({
    ...payload,
    startTime: new Date(),
  })
)();

export const supplierCheckOutAction = createAction(
  '@provider/check-out',
  (payload: SupplierRegister): SupplierCheckOut => ({
    ...payload,
    stopTime: new Date(),
  })
)();
