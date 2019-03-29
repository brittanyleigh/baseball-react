import sports from '../apis/sportsfeed';

export const fetchTeamData = () => async (dispatch, getState) => { 
    const response = await sports.get('/overall_team_standings.json');
  
    dispatch({type: 'TEAM_SELECTED', payload: response.data.overallteamstandings.teamstandingsentry});
  };
  