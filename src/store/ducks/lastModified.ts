// eslint-disable-next-line
import { ActionType, State } from './';

// ACTIONS
const SET_LAST_MODIFIED = 'SET_LAST_MODIFIED';

interface SetLastModifiedAction {
  payload: number;
  type: typeof SET_LAST_MODIFIED;
}

export type LastModifiedActionType = SetLastModifiedAction;

// ACTION CREATORS
export const setLastModified = (state: number): SetLastModifiedAction => ({
  payload: state,
  type: SET_LAST_MODIFIED,
});

// REDUCERS
export type LastModifiedState = number;

export default (state: LastModifiedState = 0, action: ActionType): LastModifiedState => {
  switch (action.type) {
    case SET_LAST_MODIFIED:
      return action.payload;
    default:
      return state;
  }
};

// SELECTORS
export const getLastModified = (state: State): LastModifiedState => state.lastModified;
