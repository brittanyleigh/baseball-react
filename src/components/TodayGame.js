import React from "react";
import { connect } from "react-redux";
import Error from "./Error";
import TeamDataPlaceholder from "./TeamDataPlaceholder";
import Schedule from "./Schedule";
import Score from "./Score";

class TodayGame extends React.Component {
  render() {
    if (this.props.today.error) {
      return <Error />;
    } else if (this.props.today.isFetching) {
      return (
        <TeamDataPlaceholder
          heading="Today's Game"
          placeholderRows={2}
          team={this.props.team.className}
        />
      );
    } else {
      return this.props.today.data.map(game => {
        if (game.status.statusCode === "S") {
          return (
            <Schedule
              key={game.gamePk}
              game={game}
              heading="Today's Game"
              team={this.props.team.className}
            />
          );
        } else {
          return (
            <Score
              key={game.gamePk}
              game={game}
              heading="Today's Game"
              team={this.props.team.className}
            />
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
