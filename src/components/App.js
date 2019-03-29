import React from 'react';
import { connect } from 'react-redux';
import TeamChoice from './TeamChoice';
import TeamDetail from './TeamDetail';
import { fetchTeamData } from '../actions';

class App extends React.Component {
  
  componentDidMount() {
    this.props.fetchTeamData();
  }

  render(){
    return (
      <div className="container">
        Baseball!
        <TeamChoice/>
        <TeamDetail/>
      </div>
    )    
  }
}

const mapStateToProps = (state) => {
  return { teams: state.teams };
}

export default connect(mapStateToProps, 
  { fetchTeamData }
)(App);