import React from 'react';
import { connect } from 'react-redux';

const TeamDetail = ({ team }) => {
  if (!team) {
    return <div>Select a Team</div>
  }
  return (
    <div>
    <h3>Details for:</h3>
    <p>
      Title: {team.team_id}
      <br />
      Duration: {team.team_name}
    </p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { team: state.selectedTeam }
};

export default connect(mapStateToProps)(TeamDetail);