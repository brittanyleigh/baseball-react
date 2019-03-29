import sports from '../apis/sportsfeed';

const fetchTeams = async () => {
  const response = await sports.get('/overall_team_standings.json', {
    /*
    params: {
      'team': 131
    }
    */
  });
  const teams = await response.data.overallteamstandings.teamstandingsentry;
  const team_list = teams.map( function(team) {
     return team.team;
   });
  return team_list;
};
  
export default fetchTeams;