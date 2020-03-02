import React from "react";
import { connect } from "react-redux";
import Error from "./Error";
import TeamDataContainer from "./TeamDataContainer";

class TodayGame extends React.Component {
  render() {
    console.log(this.props.today);
    if (this.props.today.error) {
      return <Error />;
    } else {
      return this.props.today.data.map(game => {
        let awayTeam, homeTeam;

        if (game.status.statusCode === "S") {
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
              key={game.gamePk}
              heading="Today's Game"
              class="schedule"
              team={this.props.team.className}
              ready={!this.props.today.isFetching}
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
      });
    }
  }
}

const mapStateToProps = state => {
  return {
    today: state.today,
    team: state.team.team
  };
};

export default connect(mapStateToProps)(TodayGame);
