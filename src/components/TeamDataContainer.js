import React from 'react';
import { connect } from 'react-redux';
import ScheduleDetail from './ScheduleDetail';

class TeamDataContainer extends React.Component {
  render() {
    return (
      <div className={`team_data_container team_data_container--${this.props.class}`}>
        <h2 className="team_data_container__heading2">{this.props.heading}</h2>
        {this.props.children}
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

export default connect(mapStateToProps)(TeamDataContainer);