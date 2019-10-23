/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import trackedQueries, { TrackedQueriesActionType, TrackedQueriesState } from './trackedQueries';
import failedQueries, { FailedQueriesActionType, FailedQueriesState } from './failedQueries';
import online, { OnlineActionType, OnlineState } from './online';
import pageCount, { PageCountActionType, PageCountState } from './pageCount';
import pageError, { PageErrorActionType, PageErrorState } from './pageError';
import pageLoading, { PageLoadingActionType, PageLoadingState } from './pageLoading';
import booksLastModified, {
  BooksLastModifiedActionType,
  BooksLastModifiedState,
} from './booksLastModified';

export type ActionType =
  | OnlineActionType
  | TrackedQueriesActionType
  | FailedQueriesActionType
  | BooksLastModifiedActionType
  | PageCountActionType
  | PageErrorActionType
  | PageLoadingActionType;

export interface State {
  failedQueries: FailedQueriesState;
  booksLastModified: BooksLastModifiedState;
  online: OnlineState;
  pageCount: PageCountState;
  pageError: PageErrorState;
  pageLoading: PageLoadingState;
  trackedQueries: TrackedQueriesState;
}

export default combineReducers({
  failedQueries,
  booksLastModified,
  online,
  pageCount,
  pageError,
  pageLoading,
  trackedQueries,
});
