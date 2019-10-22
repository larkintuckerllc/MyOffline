import { combineReducers } from 'redux';
// eslint-disable-next-line
import trackedQueries, { TrackedQueriesActionType, TrackedQueriesState } from './trackedQueries';
// eslint-disable-next-line
import failedQueries, { FailedQueriesActionType, FailedQueriesState } from './failedQueries';
// eslint-disable-next-line
import online, { OnlineActionType, OnlineState } from './online';
// eslint-disable-next-line
import booksLastModified, {
  BooksLastModifiedActionType,
  BooksLastModifiedState,
} from './booksLastModified';
// eslint-disable-next-line
import pagePage , { PagePageActionType, PagePageState } from './pagePage';
// eslint-disable-next-line
import pageCount , { PageCountActionType, PageCountState } from './pageCount';

export type ActionType =
  | OnlineActionType
  | TrackedQueriesActionType
  | FailedQueriesActionType
  | BooksLastModifiedActionType
  | PagePageActionType
  | PageCountActionType;

export interface State {
  failedQueries: FailedQueriesState;
  booksLastModified: BooksLastModifiedState;
  online: OnlineState;
  pageCount: PageCountState;
  pagePage: PagePageState;
  trackedQueries: TrackedQueriesState;
}

export default combineReducers({
  failedQueries,
  booksLastModified,
  online,
  pageCount,
  pagePage,
  trackedQueries,
});
