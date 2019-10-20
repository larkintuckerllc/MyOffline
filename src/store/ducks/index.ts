import { combineReducers } from 'redux';
// eslint-disable-next-line
import trackedQueries, { TrackedQueriesActionType, TrackedQueriesState } from './trackedQueries';
// eslint-disable-next-line
import failedQueries, { FailedQueriesActionType, FailedQueriesState } from './failedQueries';
// eslint-disable-next-line
import online, { OnlineActionType, OnlineState } from './online';
// eslint-disable-next-line
import booksLastModified, { BooksLastModifiedActionType, BooksLastModifiedState } from './booksLastModified';

export type ActionType =
  | OnlineActionType
  | TrackedQueriesActionType
  | FailedQueriesActionType
  | BooksLastModifiedActionType;

export interface State {
  failedQueries: FailedQueriesState;
  booksLastModified: BooksLastModifiedState;
  online: OnlineState;
  trackedQueries: TrackedQueriesState;
}

export default combineReducers({
  failedQueries,
  booksLastModified,
  online,
  trackedQueries,
});
