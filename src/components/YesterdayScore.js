import React from "react";
import { useSelector } from "react-redux";

import Error from "./Error";
import Score from "./Score";
import PlaceholderBlock from "./PlaceholderBlock";

function YesterdayScore() {
  const store = useSelector(state => state);
  const { yesterday, team } = store;
  const selected_team = team.team;

  if (yesterday.isFetching) {
    return (
      <PlaceholderBlock placeholderRows={2} team={selected_team.className} />
    );
  } else if (yesterday.data.length > 0) {
    return yesterday.data.map(game => {
      return (
        <Score
          key={game.gamePk}
          game={game}
          heading="Yesterday's Score"
          team={selected_team.className}
        />
      );
    });
  }

  return <Error heading="Yesterday's Score" team={selected_team.className} />;
}

export default YesterdayScore;
