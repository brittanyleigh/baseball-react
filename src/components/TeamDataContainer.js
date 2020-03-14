import React from "react";

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
  }

  render() {
    const { heading, children } = this.props;

    return (
      <div className={`team_container team_container--${this.props.class} `}>
        <h4
          className={`team_container__heading team_container__heading--${this.props.team}`}
        >
          {heading}
          {this.renderSubHeading()}
        </h4>
        {children}
      </div>
    );
  }
}

export default TeamDataContainer;
