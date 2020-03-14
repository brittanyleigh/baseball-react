import React from "react";
import PropTypes from "prop-types";
import TeamDataContainer from "./TeamDataContainer";

class PlayerStats extends React.Component {
  renderStats() {
    return this.props.stat.map(player => {
      return (
        <div className="team_container__row" key={player.person.ID}>
          <span className="team_container__span">{player.person.fullName}</span>
          <span className="team_container__span">{player.value}</span>
        </div>
      );
    });
  }

  statName = () => {
    switch (this.props.statName) {
      case "homeRuns":
        return "Home Runs";
      case "runsBattedIn":
        return "RBIs";
      case "battingAverage":
        return "Batting Average";
      case "onBasePlusSlugging":
        return "OPS";
      case "wins":
        return "Wins";
      case "earnedRunAverage":
        return "ERA";
      default:
        return "Misc. Stats";
    }
  };

  render() {
    return (
      <TeamDataContainer heading={this.statName()} team={this.props.className}>
        {this.renderStats()}
      </TeamDataContainer>
    );
  }
}

PlayerStats.propTypes = {
  className: PropTypes.string.isRequired,
  statName: PropTypes.string.isRequired,
  stat: PropTypes.object.isRequired
};

export default PlayerStats;
