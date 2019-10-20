import { combineReducers } from 'redux';
// eslint-disable-next-line
import trackedQueries, { TrackedQueriesActionType, TrackedQueriesState } from './trackedQueries';
// eslint-disable-next-line
import failedQueries, { FailedQueriesActionType, FailedQueriesState } from './failedQueries';
// eslint-disable-next-line
import online, { OnlineActionType, OnlineState } from './online';
// eslint-disable-next-line
import lastModified, { LastModifiedActionType, LastModifiedState } from './lastModified';

export type ActionType =
  | OnlineActionType
  | TrackedQueriesActionType
  | FailedQueriesActionType
  | LastModifiedActionType;

export interface State {
  failedQueries: FailedQueriesState;
  lastModified: LastModifiedState;
  online: OnlineState;
  trackedQueries: TrackedQueriesState;
}

export default combineReducers({
  failedQueries,
  lastModified,
  online,
  trackedQueries,
});
