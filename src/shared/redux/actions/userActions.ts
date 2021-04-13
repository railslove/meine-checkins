import User from 'src/shared/models/User';
import {createAction} from 'typesafe-actions';

export const saveUserAction = createAction('@user/save', (user: User) => ({user}))();
