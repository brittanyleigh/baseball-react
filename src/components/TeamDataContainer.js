import React from "react";
import PropTypes from "prop-types";

class TeamDataContainer extends React.Component {
  renderSubHeading() {
    const { subheading } = this.props;

    if (subheading) {
      return (
        <React.Fragment>
          <br />
          <span className="span--italic span--transparent span--small">
            {" "}
            {subheading}
          </span>
        </React.Fragment>
      );
    }
    return null;
  }

  render() {
    const { heading, children, className, team } = this.props;

    return (
      <div className={`team_container team_container--${className} `}>
        <h4
          className={`team_container__heading team_container__heading--${team}`}
        >
          {heading}
          {this.renderSubHeading()}
        </h4>
        {children}
      </div>
    );
  }
}

TeamDataContainer.propTypes = {
  subheading: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  className: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired
};

export default TeamDataContainer;
