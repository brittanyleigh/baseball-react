import React from "react";
import PropTypes from "prop-types";

import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

class TeamDataPlaceholder extends React.Component {
  render() {
    const { team, heading, placeholderRows } = this.props;

    return (
      <div className="team_container">
        <h4
          className={`team_container__heading team_container__heading--${team}`}
        >
          {heading}
        </h4>
        <ReactPlaceholder
          type="text"
          ready={false}
          rows={placeholderRows}
          color="#eeeeee"
        />
      </div>
    );
  }
}

TeamDataPlaceholder.propTypes = {
  heading: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  placeholderRows: PropTypes.number.isRequired
};

export default TeamDataPlaceholder;
