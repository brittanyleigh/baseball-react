import React from "react";
import { connect } from "react-redux";
import Error from "./Error";
import TeamDataContainer from "./TeamDataContainer";

class YesterdayScore extends React.Component {
  render() {
    if (this.props.yesterday.error) {
      return <Error />;
    } else {
      return this.props.yesterday.data.map(game => {
        let outcome, awayTeam, homeTeam, key;

        // get game status & win/loss if played
        if (game.status.statusCode !== "F") {
          outcome = game.status.detailedStatus;
        } else {
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

        if (game.status.statusCode === "F") {
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
        }

        return (
          <TeamDataContainer
            key={game.gamePk}
            heading="Yesterday's Score"
            class="schedule"
            team={this.props.team.className}
            ready={!this.props.yesterday.isFetching}
            placeholderRows={2}
          >
            <div className="game game--yesterday">
              <div className="game__detail">{outcome}</div>
              {awayTeam}
              {homeTeam}
            </div>
          </TeamDataContainer>
        );
      });
    }

    return null;
  }
}

const mapStateToProps = state => {
  return {
    yesterday: state.yesterday,
    team: state.team.team
  };
};

export default connect(mapStateToProps)(YesterdayScore);
