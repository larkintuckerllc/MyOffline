// eslint-disable-next-line
import { ActionType, State } from './';

// ACTIONS
const SET_PAGE_ERROR = 'SET_PAGE_ERROR';

interface SetPageErrorAction {
  payload: boolean;
  type: typeof SET_PAGE_ERROR;
}

export type PageErrorActionType = SetPageErrorAction;

// ACTION CREATORS
export const setPageError = (state: boolean): SetPageErrorAction => ({
  payload: state,
  type: SET_PAGE_ERROR,
});

// REDUCERS
export type PageErrorState = boolean;

export default (state: PageErrorState = false, action: ActionType): PageErrorState => {
  switch (action.type) {
    case SET_PAGE_ERROR:
      return action.payload;
    default:
      return state;
  }
};

// SELECTORS
export const getPageError = (state: State): PageErrorState => state.pageError;
