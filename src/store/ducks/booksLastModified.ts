// eslint-disable-next-line
import { ActionType, State } from './';

// ACTIONS
const SET_BOOKS_LAST_MODIFIED = 'SET_BOOKS_LAST_MODIFIED';

interface SetBooksLastModifiedAction {
  payload: number;
  type: typeof SET_BOOKS_LAST_MODIFIED;
}

export type BooksLastModifiedActionType = SetBooksLastModifiedAction;

// ACTION CREATORS
export const setBooksLastModified = (state: number): SetBooksLastModifiedAction => ({
  payload: state,
  type: SET_BOOKS_LAST_MODIFIED,
});

// REDUCERS
export type BooksLastModifiedState = number;

export default (state: BooksLastModifiedState = 0, action: ActionType): BooksLastModifiedState => {
  switch (action.type) {
    case SET_BOOKS_LAST_MODIFIED:
      return action.payload;
    default:
      return state;
  }
};

// SELECTORS
export const getBooksLastModified = (state: State): BooksLastModifiedState =>
  state.booksLastModified;
