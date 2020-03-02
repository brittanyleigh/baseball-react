import React from "react";
import { connect } from "react-redux";
import Error from "./Error";
import TeamDataContainer from "./TeamDataContainer";

class Schedule extends React.Component {
  render() {
    const { game, heading, team, ready } = this.props;
    let awayTeam, homeTeam;

    awayTeam = (
      <div className="game__team game__team--away">
        {game.teams.away.team.name} @
      </div>
    );
    homeTeam = (
      <div className="game__team game__team--home">
        {game.teams.home.team.name}{" "}
      </div>
    );
    let gameTime = new Date(game.gameDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    gameTime = gameTime.charAt(0) === "0" ? gameTime.slice(1) : gameTime;

    return (
      <TeamDataContainer
        heading={heading}
        class="schedule"
        team={team}
        ready={ready}
        placeholderRows={2}
      >
        <div className="game">
          <div className="game__detail">{gameTime}</div>
          {awayTeam}
          {homeTeam}
        </div>
      </TeamDataContainer>
    );
  }
}

export default Schedule;
