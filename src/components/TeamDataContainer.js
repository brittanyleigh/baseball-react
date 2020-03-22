import React from "react";
import PropTypes from "prop-types";

class TeamDataContainer extends React.Component {
  render() {
    const { heading, children, className, team } = this.props;

    return (
      <div className={`team_container team_container--${className} `}>
        <h4
          className={`team_container__heading team_container__heading--${team}`}
        >
          {heading}
        </h4>
        {children}
      </div>
    );
  }
}

TeamDataContainer.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  className: PropTypes.string,
  team: PropTypes.string.isRequired
};

export default TeamDataContainer;
