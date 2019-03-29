import sports from '../apis/sportsfeed';

export const fetchTeamData = () => async (dispatch, getState) => { 
    const response = await sports.get('/overall_team_standings.json');
    const team_list = response.data.overallteamstandings.teamstandingsentry.map( function(team) {
       return team.team;
     });
    dispatch({type: 'TEAM_LIST', payload: team_list});
  };
  

export const selectTeam = (team) => {
  localStorage.setItem('selected_team', JSON.stringify(team));
  return {
    type: 'TEAM_SELECTED',
    payload: team
  };
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