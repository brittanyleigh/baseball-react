import React from 'react';
import { connect } from 'react-redux';
import SelectTeam from './SelectTeam';
import TeamDataContainer from './TeamDataContainer';
import YesterdayScore from './YesterdayScore';
import TodayGame from './TodayGame';
import { fetchTeamData, getPreviousTeam, getYesterdayScore, getTodayGame } from '../actions';


class App extends React.Component {
  
  componentDidMount() {
    this.props.fetchTeamData();
    this.props.getPreviousTeam();
    this.props.getYesterdayScore();
    this.props.getTodayGame();
  }
  
  render(){
    return (
      <div className="container">
        <SelectTeam/>
        <TeamDataContainer heading="Yesterday's Score" class="schedule">
          <YesterdayScore/>
        </TeamDataContainer>
        <TeamDataContainer heading="Today's Game" class="schedule">
          <TodayGame/>
        </TeamDataContainer>
      </div>
    )    
  }
}

const mapStateToProps = (state) => {
  return { 
  };
}

export default connect(mapStateToProps, 
  { fetchTeamData, getPreviousTeam, getYesterdayScore, getTodayGame }
)(App);