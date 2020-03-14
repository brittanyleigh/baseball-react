import React from "react";
import { connect } from "react-redux";
import Error from "./Error";
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
        break;
      case "runsBattedIn":
        return "RBIs";
        break;
      case "battingAverage":
        return "Batting Average";
        break;
      case "onBasePlusSlugging":
        return "OPS";
        break;
      case "wins":
        return "Wins";
        break;
      case "earnedRunAverage":
        return "ERA";
        break;
      default:
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

export default PlayerStats;
