import {createReducer} from 'typesafe-actions';
import {SupplierCheckInItem, SupplierRegister} from 'src/shared/models/Supplier';
import {
  supplierRegisterAction,
  supplierCheckInAction,
  supplierCheckOutAction,
} from 'src/shared/redux/actions/supplierActions';

export type CheckInsInitialState = {
  error?: Error;
  items: SupplierCheckInItem[];
  current?: SupplierRegister;
};

export const getCheckInsInitialState = (): CheckInsInitialState => ({
  items: [],
  error: undefined,
  current: undefined,
});

const checkInsReducer = createReducer(getCheckInsInitialState())
  .handleAction(supplierRegisterAction, (state, {payload}) => {
    return {
      ...state,
      current: payload,
    };
  })
  .handleAction(supplierCheckInAction, (state, {payload}) => {
    return {
      ...state,
      items: state.items.concat(payload),
    };
  })
  .handleAction(supplierCheckOutAction, (state, {payload: supplier}) => {
    const url = supplier.url;

    return {
      ...state,
      current: undefined,
      items: state.items.map(el => {
        return el.url === url ? {...el, ...supplier} : el;
      }),
    };
  });

export default checkInsReducer;
