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
  dispatch({type: 'YESTERDAY_SCORE', payload: response.data.scoreboard.gameScore});   
};  