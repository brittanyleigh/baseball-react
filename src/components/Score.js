import React from "react";
import PropTypes from "prop-types";

import Block from "./Block";

class Score extends React.Component {
  render() {
    const { game, heading, team } = this.props;
    let outcome, awayTeam, homeTeam;

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
        parseInt(game.teams.home.score, 10) >
          parseInt(game.teams.away.score, 10)
      ) {
        outcome = "W";
      } else if (
        this.props.team.id === game.teams.away.team.id &&
        parseInt(game.teams.away.score, 10) >
          parseInt(game.teams.home.score, 10)
      ) {
        outcome = "W";
      } else {
        outcome = "L";
      }
    }

    return (
      <Block heading={heading} team={team}>
        <div className="game game--yesterday">
          <div className="game__detail">{outcome}</div>
          {awayTeam}
          {homeTeam}
        </div>
      </Block>
    );
  }
}

Score.propTypes = {
  game: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired
};

export default Score;
