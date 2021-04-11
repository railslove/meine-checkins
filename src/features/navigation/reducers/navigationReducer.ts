import {createReducer} from 'typesafe-actions';

export type NavigationReducerState = {
  isBottomTabsVisible: boolean;
};

export const getNavigationInitialState = (
  initialState: Partial<NavigationReducerState> = {}
): NavigationReducerState => ({
  isBottomTabsVisible: true,
  ...initialState,
});

const navigationReducer = createReducer(getNavigationInitialState());

export default navigationReducer;
