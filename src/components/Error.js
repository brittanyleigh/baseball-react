import React from "react";
import PropTypes from "prop-types";
import TeamDataContainer from "./TeamDataContainer";

class Error extends React.Component {
  render() {
    const { heading, team } = this.props;

    return (
      <TeamDataContainer heading={heading} className="schedule" team={team}>
        <div className="team_container__item text--center">
          <h5>
            Oh no, something went wrong!<br></br>Check back later.
          </h5>
        </div>
      </TeamDataContainer>
    );
  }
}

Error.propTypes = {
  heading: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired
};

export default Error;
