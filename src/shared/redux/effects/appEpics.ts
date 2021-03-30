import {isActionOf} from 'typesafe-actions';
import {filter, tap, map} from 'rxjs/operators';

import {initializeAppAction} from 'src/shared/redux/actions/appActions';
import {AppEpic} from 'src/shared/types/redux-observable';

export const initializeAppEpic: AppEpic = action$ =>
  action$.pipe(
    filter(isActionOf(initializeAppAction.request)),
    tap(console.log.bind(console)),
    map(() => initializeAppAction.success()),
    tap(console.log.bind(console))
  );
