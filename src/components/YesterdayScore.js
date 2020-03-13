import React from "react";
import { connect } from "react-redux";
import Error from "./Error";
import Score from "./Score";
import TeamDataPlaceholder from "./TeamDataPlaceholder";

class YesterdayScore extends React.Component {
  render() {
    if (this.props.yesterday.error) {
      return (
        <Error heading="Yesterday's Score" team={this.props.team.className} />
      );
    } else if (this.props.yesterday.isFetching) {
      return (
        <TeamDataPlaceholder
          heading="Yesterday's Score"
          placeholderRows={2}
          team={this.props.team.className}
        />
      );
    } else {
      return this.props.yesterday.data.map(game => {
        return (
          <Score
            key={game.gamePk}
            game={game}
            heading="Yesterday's Score"
            team={this.props.team.className}
            ready={!this.props.yesterday.isFetching}
          />
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
