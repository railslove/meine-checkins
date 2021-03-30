import {Action} from 'typesafe-actions';

declare module 'typesafe-actions' {
  export interface Types {
    RootAction: Action;
  }
}
