import { combineReducers } from 'redux';
import teamsReducer from './teamsReducer';
import selectTeamReducer from './selectTeamReducer';

export default combineReducers({
  teams: teamsReducer,
  selected_team: selectTeamReducer,
})