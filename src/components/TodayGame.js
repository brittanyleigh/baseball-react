import React from "react";
import { useSelector } from "react-redux";

import Empty from "./Empty";
import PlaceholderBlock from "./PlaceholderBlock";
import Schedule from "./Schedule";
import Score from "./Score";

function TodayGame() {
  const store = useSelector(state => state);
  const { today, team } = store;
  const selected_team = team.team;

  if (today.isFetching) {
    return (
      <PlaceholderBlock placeholderRows={2} team={selected_team.className} />
    );
  } else if (today.data.length > 0) {
    return today.data.map(game => {
      if (game.status.statusCode === "F" || game.status.statusCode === "O") {
        // TODO: display box score for live game
        return (
          <Score
            key={game.gamePk}
            game={game}
            heading="Today's Game"
            team={selected_team}
          />
        );
      }
      return (
        <Schedule
          key={game.gamePk}
          game={game}
          heading="Today's Game"
          team={selected_team.className}
          displayStatus={game.status.statusCode !== "S"}
        />
      );
    });
  } else if (today.data.length === 0) {
    return (
      <Empty
        heading="Today's Game"
        team={selected_team.className}
        offDay={true}
      />
    );
  }
  return (
    <Empty heading="Today's Game" team={selected_team.className} error={true} />
  );
}

export default TodayGame;
