import sports from '../apis/sportsfeed';

export const fetchTeamData = () => async (dispatch, getState) => { 
    const response = await sports.get('/overall_team_standings.json');
    const team_list = response.data.overallteamstandings.teamstandingsentry.map( function(team) {
       return team.team;
     });
    dispatch({type: 'TEAM_LIST', payload: team_list});
  };

export const selectTeam = (team) => (dispatch, getState) => {
  localStorage.setItem('selected_team', JSON.stringify(team));
  dispatch({type: 'TEAM_SELECTED', payload: team});
};

export const getPreviousTeam = (team) => {
  if (localStorage.hasOwnProperty('selected_team')) {
    var previous_team = localStorage.getItem('selected_team');
    
    try {
      previous_team = JSON.parse(previous_team);
    } catch (e) {
      // 
    }
  }
  
  return {
    type: 'TEAM_SELECTED',
    payload: previous_team
  };
};

export const getYesterdayScore = () => async (dispatch, getState) => { 
  const yesterday = new Date(Date.now() - 864e5);
  const yester_year = yesterday.getFullYear();
  const yester_month = ('0' + (yesterday.getMonth() + 1)).slice(-2);
  const yester_date = yesterday.getDate();
  const scoreDate = yester_year + yester_month + yester_date;
  const team = getState().selected_team;
  const response = await sports.get('scoreboard.json?fordate=' + scoreDate + '&team=' + team.ID);
  let nogame = [{
    id: 0, 
    isUnplayed: 'true',
    game: {scheduleStatus: 'Off Day!'} 
    }]
  let payload = response.data.scoreboard.gameScore ? response.data.scoreboard.gameScore : nogame;
  dispatch({type: 'YESTERDAY_SCORE', payload: payload});   
};  

export const getTodayGame = () => async (dispatch, getState) => { 
  const today = new Date(Date.now());
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const date = today.getDate();
  const gameDate = year + month + date;
  const team = getState().selected_team;
  const response = await sports.get('daily_game_schedule.json?fordate=' + gameDate + '&team=' + team.ID);
  let nogame = [{id: 0, time: 'Off Day!'}]
  let payload = response.data.dailygameschedule.gameentry ? response.data.dailygameschedule.gameentry : nogame;
  dispatch({type: 'TODAY_GAME', payload: payload});   
};  

export const getStandings = () => async (dispatch, getState) => { 
  var param = encodeURIComponent('W,L,GB,Win %');
  const response = await sports.get('division_team_standings.json?teamstats=' + param);
  const team = getState().selected_team.ID;
  let division;
  if (team > 110 && team < 116) {
    division = 0;
  } else if (team > 115 && team < 121) {
    division = 1;
  } else if (team > 120 && team < 126) {
    division = 2;
  } else if (team > 125 && team < 131) {
    division = 3;
  } else if (team > 130 && team < 136) {
    division = 4;
  } else if (team > 135 && team < 141) {
    division = 5;
  }
  dispatch({type: 'STANDINGS', payload: response.data.divisionteamstandings.division[division]});   
};  