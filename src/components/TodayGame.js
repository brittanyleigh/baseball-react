import React from "react";
import { connect } from "react-redux";
import Error from "./Error";
import TeamDataContainer from "./TeamDataContainer";
import Schedule from "./Schedule";

class TodayGame extends React.Component {
  render() {
    console.log(this.props.today);
    if (this.props.today.error) {
      return <Error />;
    } else {
      return this.props.today.data.map(game => {
        if (game.status.statusCode === "S") {
          return (
            <Schedule
              key={game.gamePk}
              game={game}
              heading="Today's Game"
              team={this.props.team.className}
              ready={!this.props.today.isFetching}
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
