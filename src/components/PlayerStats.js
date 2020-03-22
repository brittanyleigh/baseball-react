import React from "react";
import PropTypes from "prop-types";
import Block from "./Block";

class PlayerStats extends React.Component {
  renderStats() {
    return this.props.stat.map(player => {
      return (
        <div className="block__row" key={player.person.id}>
          <span className="block__span">{player.person.fullName}</span>
          <span className="block__span">{player.value}</span>
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
      <Block heading={this.statName()} team={this.props.className}>
        {this.renderStats()}
      </Block>
    );
  }
}

PlayerStats.propTypes = {
  className: PropTypes.string.isRequired,
  statName: PropTypes.string.isRequired,
  stat: PropTypes.array.isRequired
};

export default PlayerStats;
