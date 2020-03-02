import React from "react";
import Error from "./Error";
import TeamDataContainer from "./TeamDataContainer";

class Score extends React.Component {
  render() {
    const { game, heading, team, ready } = this.props;
    let outcome, awayTeam, homeTeam, key;

    if (game.status.statusCode !== "F") {
      outcome = game.status.detailedStatus;
    } else {
      awayTeam = (
        <div className="game__team game__team--away">
          {game.teams.away.team.name}: {game.teams.away.score}
        </div>
      );
      homeTeam = (
        <div className="game__team game__team--home">
          {game.teams.home.team.name}: {game.teams.home.score}
        </div>
      );

      if (
        this.props.team.id === game.teams.home.team.id &&
        parseInt(game.teams.home.score) > parseInt(game.teams.away.score)
      ) {
        outcome = "W";
      } else if (
        this.props.team.id === game.teams.away.team.id &&
        parseInt(game.teams.away.score) > parseInt(game.teams.home.score)
      ) {
        outcome = "W";
      } else {
        outcome = "L";
      }
    }

    return (
      <TeamDataContainer
        heading={heading}
        class="schedule"
        team={team}
        ready={ready}
        placeholderRows={2}
      >
        <div className="game game--yesterday">
          <div className="game__detail">{outcome}</div>
          {awayTeam}
          {homeTeam}
        </div>
      </TeamDataContainer>
    );
  }
}

export default Score;
