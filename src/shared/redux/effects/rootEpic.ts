import {combineEpics} from 'redux-observable';

import * as appEpics from 'src/shared/redux/effects/appEpics';

export const rootEpic = combineEpics(...Object.values(appEpics));
