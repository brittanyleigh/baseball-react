import React from "react";
import { connect } from "react-redux";

import Error from "./Error";
import Score from "./Score";
import TeamDataPlaceholder from "./TeamDataPlaceholder";

class YesterdayScore extends React.Component {
  render() {
    const { yesterday, selected_team } = this.props;

    if (yesterday.error) {
      return (
        <Error heading="Yesterday's Score" team={selected_team.className} />
      );
    } else if (yesterday.isFetching) {
      return (
        <TeamDataPlaceholder
          heading="Yesterday's Score"
          placeholderRows={2}
          team={selected_team.className}
        />
      );
    } else {
      return yesterday.data.map(game => {
        return (
          <Score
            key={game.gamePk}
            game={game}
            heading="Yesterday's Score"
            team={selected_team.className}
          />
        );
      });
    }
  }
}

const mapStateToProps = state => {
  return {
    yesterday: state.yesterday,
    selected_team: state.team.team
  };
};

export default connect(mapStateToProps)(YesterdayScore);
