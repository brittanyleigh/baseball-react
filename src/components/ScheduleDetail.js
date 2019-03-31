import React from 'react';
import { connect } from 'react-redux';


class ScheduleDetail extends React.Component {
  render() {
    return (
        <h3>Details for: {this.props.selected_team.Name}</h3>
    )  
  }
}

const mapStateToProps = (state) => {
  return { 
    team: state.selectedTeam,
    selected_team: state.selected_team,
    yesterday: state.yesterday 
  }
};

export default connect(mapStateToProps)(ScheduleDetail);