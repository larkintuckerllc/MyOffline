// eslint-disable-next-line
import { ActionType, State } from './';

// ACTIONS
const SET_PAGE_COUNT = 'SET_PAGE_COUNT';

interface SetPageCountAction {
  payload: number;
  type: typeof SET_PAGE_COUNT;
}

export type PageCountActionType = SetPageCountAction;

// ACTION CREATORS
export const setPageCount = (state: number): SetPageCountAction => ({
  payload: state,
  type: SET_PAGE_COUNT,
});

// REDUCERS
export type PageCountState = number;

export default (state: PageCountState = 0, action: ActionType): PageCountState => {
  switch (action.type) {
    case SET_PAGE_COUNT:
      return action.payload;
    default:
      return state;
  }
};

// SELECTORS
export const getPageCount = (state: State): PageCountState =>
  state.pageCount;
