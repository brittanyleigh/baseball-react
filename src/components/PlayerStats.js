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

  render() {
    return (
      <TeamDataContainer
        heading={this.props.statName}
        team={this.props.className}
      >
        {this.renderStats()}
      </TeamDataContainer>
    );
  }
}

export default PlayerStats;
