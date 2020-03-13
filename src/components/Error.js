import React from "react";
import { connect } from "react-redux";
import TeamDataContainer from "./TeamDataContainer";

class Error extends React.Component {
  render() {
    return (
      <TeamDataContainer
        heading={this.props.heading}
        class="schedule"
        team={this.props.team}
      >
        <div className="team_container__item text--center">
          <h5>
            Oh no, something went wrong!<br></br>Check back later.
          </h5>
        </div>
      </TeamDataContainer>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(Error);
