import React from 'react';
import { connect } from 'react-redux';
import SelectTeam from './SelectTeam';
import TeamDataContainer from './TeamDataContainer';
import ScheduleDetail from './ScheduleDetail';
import { fetchTeamData, getPreviousTeam, getYesterdayScore } from '../actions';


class App extends React.Component {
  
  componentDidMount() {
    this.props.fetchTeamData();
    this.props.getPreviousTeam();
    this.props.getYesterdayScore();
  }
  
  render(){
    console.log(this.props);
    return (
      <div className="container">
        <SelectTeam/>
        <TeamDataContainer heading="Yesterday's Score" class="schedule">
          <ScheduleDetail/>
        </TeamDataContainer>
        <TeamDataContainer heading="Today's Game" class="schedule">
          <ScheduleDetail/>
        </TeamDataContainer>
      </div>
    )    
  }
}

const mapStateToProps = (state) => {
  return { 
    teams: state.teams,
    selected_team: state.selected_team, 
    yesterday: state.yesterday
  };
}

export default connect(mapStateToProps, 
  { fetchTeamData, getPreviousTeam, getYesterdayScore }
)(App);