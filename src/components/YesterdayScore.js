import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Error from "./Error";
import Score from "./Score";
import TeamDataPlaceholder from "./TeamDataPlaceholder";

class YesterdayScore extends React.Component {
  render() {
    const { yesterday, selected_team } = this.props;

    if (yesterday.isFetching) {
      return (
        <TeamDataPlaceholder
          heading="Yesterday's Score"
          placeholderRows={2}
          team={selected_team.className}
        />
      );
    } else if (yesterday.data.length > 0) {
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

    return <Error heading="Yesterday's Score" team={selected_team.className} />;
  }
}

YesterdayScore.propTypes = {
  yesterday: PropTypes.object.isRequired,
  selected_team: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    yesterday: state.yesterday,
    selected_team: state.team.team
  };
};

export default connect(mapStateToProps)(YesterdayScore);
