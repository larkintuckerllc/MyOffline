// eslint-disable-next-line
import { ActionType, State } from './';

// ACTIONS
const SET_PAGE_LOADING = 'SET_PAGE_LOADING';

interface SetPageLoadingAction {
  payload: boolean;
  type: typeof SET_PAGE_LOADING;
}

export type PageLoadingActionType = SetPageLoadingAction;

// ACTION CREATORS
export const setPageLoading = (state: boolean): SetPageLoadingAction => ({
  payload: state,
  type: SET_PAGE_LOADING,
});

// REDUCERS
export type PageLoadingState = boolean;

export default (state: PageLoadingState = false, action: ActionType): PageLoadingState => {
  switch (action.type) {
    case SET_PAGE_LOADING:
      return action.payload;
    default:
      return state;
  }
};

// SELECTORS
export const getPageLoading = (state: State): PageLoadingState => state.pageLoading;
