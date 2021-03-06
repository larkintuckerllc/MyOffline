// eslint-disable-next-line
import { ActionType, State } from './';

// ACTIONS
const SET_ONLINE = 'SET_ONLINE';

interface SetOnlineAction {
  payload: boolean;
  type: typeof SET_ONLINE;
}

export type OnlineActionType = SetOnlineAction;

// ACTION CREATORS
export const setOnline = (state: boolean): SetOnlineAction => ({
  payload: state,
  type: SET_ONLINE,
});

// REDUCERS
export type OnlineState = boolean;

export default (state: OnlineState = false, action: ActionType): OnlineState => {
  switch (action.type) {
    case SET_ONLINE:
      return action.payload;
    default:
      return state;
  }
};

// SELECTORS
export const getOnline = (state: State): OnlineState => state.online;
