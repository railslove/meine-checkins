import {ActionType} from 'typesafe-actions';

import * as actions from 'src/shared/redux/actions/rootActions';

export type AppAction = ActionType<typeof actions>;
