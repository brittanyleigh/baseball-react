import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Error from "./Error";
import TeamDataPlaceholder from "./TeamDataPlaceholder";
import Schedule from "./Schedule";
import Score from "./Score";

class TodayGame extends React.Component {
  render() {
    const { today, selected_team } = this.props;

    if (today.isFetching) {
      return (
        <TeamDataPlaceholder
          heading="Today's Game"
          placeholderRows={2}
          team={selected_team.className}
        />
      );
    } else if (today.data.length > 0) {
      return today.data.map(game => {
        if (game.status.statusCode === "F" || game.status.statusCode === "O") {
          // TODO: display box score for live game
          return (
            <Score
              key={game.gamePk}
              game={game}
              heading="Today's Game"
              team={selected_team.className}
            />
          );
        }
        return (
          <Schedule
            key={game.gamePk}
            game={game}
            heading="Today's Game"
            team={selected_team.className}
            displayStatus={game.status.statusCode !== "S" && true}
          />
        );
      });
    }
    return <Error heading="Today's Game" team={selected_team.className} />;
  }
}

TodayGame.propTypes = {
  selected_team: PropTypes.object.isRequired,
  today: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    today: state.today,
    selected_team: state.team.team
  };
};

export default connect(mapStateToProps)(TodayGame);
