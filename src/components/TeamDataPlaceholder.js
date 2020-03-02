import React from "react";
import { connect } from "react-redux";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

class TeamDataPlaceholder extends React.Component {
  parentClass() {
    return "team_container";
  }

  render() {
    return (
      <div
        className={`${this.parentClass()} ${this.parentClass()}--${
          this.props.class
        }`}
        id={this.props.id}
      >
        <h4
          className={`${this.parentClass()}__heading ${this.parentClass()}__heading--${
            this.props.team
          }`}
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
