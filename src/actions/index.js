import sports from '../apis/sportsfeed';
import news from '../apis/news';
//
export const fetchTeamData = () => async (dispatch, getState) => {
  // schedule
  // const response = await sports.get('schedule/games/?sportId=1&date=2019-05-21&teamId=112');
  // standings
  // const response = await sports.get('standings/?leagueId=103,104&season=2019');
  // below includes season start and end dates
   //const response = await sports.get('league?sportId=1&leagueId=103,104');
   // below gets list of all teams
  const response = await sports.get('teams?sportId=1&leagueId=103,104');
  // yesterday score
  // today game
  // team leaders - avg, hr, rbi, ops
  // today live game
  // const response = await sports.get('/schedule?sportId=1&date=2020-02-21&gameTypes=R&hydrate=team(leaders(showOnPreview(leaderCategories=[homeRuns,runsBattedIn,battingAverage],statGroup=[pitching,hitting]))),linescore(matchup,runners),flags,liveLookin,review,broadcasts(all),decisions,person,probablePitcher,stats,homeRuns,previousPlay,game(content(media(featured,epg),summary),tickets),seriesStatus(useOverride=true)&useLatestGames=false&scheduleTypes=events,games&language=en&leagueIds=103,104')

  //const response = await sports.get('stats/leaders?leaderCategories=homeRuns&statGroup=hitting&season=2019')

  /* TEAM IDS
  158: Brewers
  147: Yankees
  146: Marlins
  145: White Sox
  144: Braves
  143: Phillies
  142: Twins
  141: Blue Jays
  140: Rangers
  139: Rays
  138: Cardinals
  137: Giants
  136: Mariners
  135: Padres
  134: Pirates
  133: Oakland As
  121: NYM
  120: Nationals
  119: LA Dodgers
  118: Royals
  117: Astros
  116: Tigers
  115: Rockies
  114: Indians
  113: Reds
  112: Cubs
  111: Red Sox
  110: Orioles
  109: Diamondbacks
  108: LA Angels





  */
  //const response = await sports.get('teams/158/leaders?leaderCategories=homeRuns&statGroup=hitting&season=2019')
  //const response = await sports.get('teams/158/leaders?leaderCategories=battingAverage&season=2019')
  //const response = await sports.get('teams/158/leaders?leaderCategories=runsBattedIn&season=2019')
  //const response = await sports.get('teams/158/leaders?leaderCategories=onBasePlusSlugging&season=2019')
  //const response = await sports.get('teams/158/leaders?leaderCategories=wins&season=2019')
  //const response = await sports.get('teams/112/leaders?leaderCategories=earnedRunAverage&season=2019')
  //const response = await sports.get('baseballStats')
  let teamIds = response.data.teams.map(value => value.id);
  dispatch({type: 'TEAM_LIST', payload: teamIds});
};

export const selectTeam = (team) => (dispatch, getState) => {
  localStorage.setItem('selected_team', JSON.stringify(team));
  dispatch({type: 'TEAM_SELECTED', payload: team});
};

export const getPreviousTeam = () => async (dispatch, getState) => {
  if (localStorage.hasOwnProperty('selected_team')) {
    var previous_team = localStorage.getItem('selected_team');

    try {
      previous_team = JSON.parse(previous_team);
    } catch (e) {
      //
    }
    dispatch({
      type: 'TEAM_SELECTED',
      payload: previous_team
    });
  }
};

export const getYesterdayScore = () => async (dispatch, getState) => {
  let payload;
  try {
    const yesterday = new Date(Date.now() - 864e5);
    const yester_year = yesterday.getFullYear();
    const yester_month = ('0' + (yesterday.getMonth() + 1)).slice(-2);
    const yester_date = yesterday.getDate();
    const scoreDate = `${yester_year}-${yester_month}-${yester_date}`;
    const team = getState().selected_team;
    //const response = await sports.get(`schedule/games/?sportId=1&date=${scoreDate}&teamId=112`);
    const response = await sports.get(`schedule/games/?sportId=1&date=2019-05-05&teamId=112`);
    let payload = response.data.dates[0].games;

  } catch {
    payload = {error: true};
  }
  dispatch({type: 'YESTERDAY_SCORE', payload: payload});
};

export const getTodayGame = () => async (dispatch, getState) => {
  let payload;
  try {
    const today = new Date(Date.now());
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const date = today.getDate();
    const gameDate = year + month + date;
    const team = getState().selected_team;
    const response = await sports.get('daily_game_schedule.json?fordate=' + gameDate + '&team=' + team.ID);
    let nogame = [{id: 0, time: 'Off Day!'}]
    payload = response.data.dailygameschedule.gameentry ? response.data.dailygameschedule.gameentry : nogame;
  } catch {
    payload = {error: true};
  }
  dispatch({type: 'TODAY_GAME', payload: payload});
};

export const getStandings = () => async (dispatch, getState) => {
  let payload;
  try {
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
    payload = response.data.divisionteamstandings.division[division];
  } catch {
    payload = {error: true}
  }
  dispatch({type: 'STANDINGS', payload: payload});
};

export const getPlayerStats = (stats) => async (dispatch, getState) => {
  const team = getState().selected_team.ID;
  const games_response = await sports.get('overall_team_standings.json?team=' + team);
  const games_played =  games_response.data.overallteamstandings.teamstandingsentry[0].stats.GamesPlayed['#text'];
  const stats_list = [];

  for (var i = 0; i < stats.length; i++) {
    try {
      const response = await sports.get('cumulative_player_stats.json?team='+ team + '&playerstats=' + stats[i] + ',PA&sort=stats.' + stats[i] + '.D&limit=10');
      const data = response.data.cumulativeplayerstats.playerstatsentry;
      const qualified_player_list = data.filter( player => {
         return (parseInt(player.stats.PlateAppearances['#text']) / games_played) >= 3.1;
       });
      stats_list[stats[i]] = qualified_player_list.slice(0, 3);
    } catch {
      stats_list[stats[i]] = {error: true};
    }
  }

  dispatch({type: 'PLAYER_STATS', payload: stats_list});
}

export const getTeamNews = () => async (dispatch, getState) => {
  let payload;
  try {
    const team = getState().selected_team;
    const team_search = encodeURIComponent(team.City + ' ' + team.Name);
    const response = await news.get('everything?q=' + team_search + '&domains=mlb.com,espn.com,bleacherreport.com&sortBy=publishedAt&pageSize=40');
    const team_news = response.data.articles.filter( article => {
       return (article.title.includes(team.Name));
     });
    payload = response.data.articles ? team_news.slice(0, 7) : null;
  } catch {
    payload = {error: true};
  }
  dispatch({type: 'TEAM_NEWS', payload: payload});
};

export const toggleMenu = () => (dispatch, getState) => {
  let menuIsOpen = getState().menuIsOpen;
  menuIsOpen = menuIsOpen === "closed" ? "open" : "closed";
  dispatch({type: 'TOGGLE_MENU', payload: menuIsOpen});
};
