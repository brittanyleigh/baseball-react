import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import TeamChoice from './TeamChoice';
import TeamDetail from './TeamDetail';
import { fetchTeamData, getPreviousTeam } from '../actions';


class App extends React.Component {
  
  componentDidMount() {
    this.props.fetchTeamData();
    this.props.getPreviousTeam();
  }
  
  render(){
    return (
      <div className="container">
        <TeamChoice/>
      </div>
    )    
  }
}

const mapStateToProps = (state) => {
  return { teams: state.teams };
}

export default connect(mapStateToProps, 
  { fetchTeamData, getPreviousTeam }
)(App);