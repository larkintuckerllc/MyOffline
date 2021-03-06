import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
// eslint-disable-next-line
import { ActionType, State } from '../ducks';

interface FailedQuery {
  id: string;
  name: string;
  variablesJSON: string;
}

// ACTIONS
const FAILED_QUERIES_ADD = 'FAILED_QUERIES_ADD';
const FAILED_QUERIES_REMOVE_ALL = 'FAILED_QUERIES_REMOVE_ALL';

interface FailedQueriesAdd {
  payload: FailedQuery;
  type: typeof FAILED_QUERIES_ADD;
}

interface FailedQueriesRemoveAll {
  type: typeof FAILED_QUERIES_REMOVE_ALL;
}

export type FailedQueriesActionType = FailedQueriesAdd | FailedQueriesRemoveAll;

// ACTION CREATORS
export const failedQueriesAdd = (failedQuery: FailedQuery): FailedQueriesAdd => ({
  payload: failedQuery,
  type: FAILED_QUERIES_ADD,
});

export const failedQueriesRemoveAll = (): FailedQueriesRemoveAll => ({
  type: FAILED_QUERIES_REMOVE_ALL,
});

// REDUCERS
interface FailedQueriesById {
  [key: string]: FailedQuery;
}

type FailedQueriesIds = string[];

export interface FailedQueriesState {
  byId: FailedQueriesById;
  ids: FailedQueriesIds;
}

const byId = (state: FailedQueriesById = {}, action: ActionType): FailedQueriesById => {
  let newState: FailedQueriesById;
  switch (action.type) {
    case FAILED_QUERIES_ADD:
      newState = {
        ...state,
        [action.payload.id]: action.payload,
      };
      return newState;
    case FAILED_QUERIES_REMOVE_ALL:
      return {};
    default:
      return state;
  }
};

const ids = (state: FailedQueriesIds = [], action: ActionType): FailedQueriesIds => {
  let newState: FailedQueriesIds;
  switch (action.type) {
    case FAILED_QUERIES_ADD:
      newState = [...state, action.payload.id];
      return newState;
    case FAILED_QUERIES_REMOVE_ALL:
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
});

// SELECTORS
const getFailedQueriesIds = (state: State): FailedQueriesIds => state.failedQueries.ids;

const getFailedQueriesById = (state: State): FailedQueriesById => state.failedQueries.byId;

export const getFailedQueries = createSelector(
  getFailedQueriesIds,
  getFailedQueriesById,
  (pIds, pById) => pIds.map(o => pById[o])
);
