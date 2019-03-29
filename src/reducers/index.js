import { combineReducers } from 'redux';
import teamsReducer from './teamsReducer';

export default combineReducers({
  teams: teamsReducer,
})