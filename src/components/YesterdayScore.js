import React from "react";
import { useSelector } from "react-redux";

import Empty from "./Empty";
import Score from "./Score";
import Schedule from "./Schedule";
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
      if (game.status.statusCode === "F") {
        return (
          <Score
            key={game.gamePk}
            game={game}
            heading="Yesterday's Score"
            team={selected_team}
          />
        );
      }
      return (
        <Schedule
          key={game.gamePk}
          game={game}
          heading="Yesterday's Game"
          team={selected_team.className}
          displayStatus={game.status.statusCode !== "S"}
        />
      );
    });
  } else if (yesterday.data.length === 0) {
    return (
      <Empty
        heading="Yesterday's Score"
        team={selected_team.className}
        offDay={true}
      />
    );
  }

  return (
    <Empty
      heading="Yesterday's Score"
      team={selected_team.className}
      error={true}
    />
  );
}

export default YesterdayScore;
