export const getTopThree = (data, games_played) => {
  // only players who have an average of 3.1 plate appearances per game qualify for batting stat titles
  const qualified_player_list = data.filter( player => {
     return (parseInt(player.stats.PlateAppearances['#text']) / games_played) >= 3.1;
   });
  return qualified_player_list.slice(0, 3);
}; 