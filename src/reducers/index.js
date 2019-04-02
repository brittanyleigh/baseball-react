import { combineReducers } from 'redux';
import teamsReducer from './teamsReducer';
import selectTeamReducer from './selectTeamReducer';
import getYesterdayScoreReducer from './getYesterdayScoreReducer';
import getTodayGameReducer from './getTodayGameReducer';
import getStandingsReducer from './getStandingsReducer';
import getPlayerStatsReducer from './getPlayerStatsReducer';

export default combineReducers({
  teams: teamsReducer,
  selected_team: selectTeamReducer,
  yesterday: getYesterdayScoreReducer,
  today: getTodayGameReducer,
  standings: getStandingsReducer,
  stats: getPlayerStatsReducer,
});