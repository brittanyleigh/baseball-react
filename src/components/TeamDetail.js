import React from 'react';
import { connect } from 'react-redux';


class TeamDetail extends React.Component {
  render() {
    return (
      <div>
      <h3>Details for: {this.props.selected_team.Name}</h3>
      </div>
    )  
  }
}

const mapStateToProps = (state) => {
  return { 
    team: state.selectedTeam,
    selected_team: state.selected_team 
  }
};

export default connect(mapStateToProps)(TeamDetail);