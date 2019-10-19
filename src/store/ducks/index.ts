import { combineReducers } from 'redux';
// eslint-disable-next-line
import trackedQueries, { TrackedQueriesActionType, TrackedQueriesState } from './trackedQueries';
// eslint-disable-next-line
import failedQueries, { FailedQueriesActionType, FailedQueriesState } from './failedQueries';
// eslint-disable-next-line
import online, { OnlineActionType, OnlineState } from './online';

export type ActionType = OnlineActionType | TrackedQueriesActionType | FailedQueriesActionType;

export interface State {
  failedQueries: FailedQueriesState;
  online: OnlineState;
  trackedQueries: TrackedQueriesState;
}

export default combineReducers({
  failedQueries,
  online,
  trackedQueries,
});
