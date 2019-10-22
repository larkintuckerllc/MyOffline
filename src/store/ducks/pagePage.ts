// eslint-disable-next-line
import { ActionType, State } from './';

// ACTIONS
const SET_PAGE_PAGE = 'SET_PAGE_PAGE';

interface SetPagePageAction {
  payload: number;
  type: typeof SET_PAGE_PAGE;
}

export type PagePageActionType = SetPagePageAction;

// ACTION CREATORS
export const setPagePage = (state: number): SetPagePageAction => ({
  payload: state,
  type: SET_PAGE_PAGE,
});

// REDUCERS
export type PagePageState = number;

export default (state: PagePageState = 0, action: ActionType): PagePageState => {
  switch (action.type) {
    case SET_PAGE_PAGE:
      return action.payload;
    default:
      return state;
  }
};

// SELECTORS
export const getPagePage = (state: State): PagePageState =>
  state.pagePage;
