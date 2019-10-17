import { combineReducers } from 'redux';
// eslint-disable-next-line
import online, { OnlineActionType, OnlineState } from './online';

export type ActionType = OnlineActionType;

export interface State {
  online: OnlineState;
}

export default combineReducers({
  online,
});
