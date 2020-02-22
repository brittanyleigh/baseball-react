// DUCKS: https://github.com/erikras/ducks-modular-redux
import { combineReducers } from "redux";

import teams from './teams';
import standings from './standings';
import yesterday from './yesterday';
import today from './today'
import stats from './stats'

const reducers = combineReducers({
  teams,
  standings,
  yesterday,
  today,
  stats
});

export default reducers;
