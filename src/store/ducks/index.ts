import { combineReducers } from 'redux';
// eslint-disable-next-line
import trackedQueries, { TrackedQueriesActionType, TrackedQueriesState } from './trackedQueries';
// eslint-disable-next-line
import online, { OnlineActionType, OnlineState } from './online';

export type ActionType = OnlineActionType | TrackedQueriesActionType;

export interface State {
  online: OnlineState;
  trackedQueries: TrackedQueriesState;
}

export default combineReducers({
  online,
  trackedQueries,
});
