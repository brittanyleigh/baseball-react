import React from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

class TeamDataPlaceholder extends React.Component {
  render() {
    return (
      <div className={`team_container team_container--${this.props.class}`}>
        <h4
          className={`team_container__heading team_container__heading--${this.props.team}`}
        >
          {this.props.heading}
        </h4>
        <ReactPlaceholder
          type="text"
          ready={false}
          rows={this.props.placeholderRows}
          color="#eeeeee"
        />
      </div>
    );
  }
}

export default TeamDataPlaceholder;
