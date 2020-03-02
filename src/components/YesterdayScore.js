import React from "react";
import { connect } from "react-redux";
import Error from "./Error";
import Score from "./Score";

class YesterdayScore extends React.Component {
  render() {
    if (this.props.yesterday.error) {
      return <Error />;
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
