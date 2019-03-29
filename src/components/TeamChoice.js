import React from 'react';
import { connect } from 'react-redux';
import { fetchTeamData } from '../actions';

class TeamChoice extends React.Component {
  renderList(){
    return (
      console.log(this.props.teams)
    )
    /*
    return this.props.teams.map((team) => {
      return (
          <div className="item" key={team.ID}>
            <div className="right floated content">
              <button className="ui button primary" onClick={() => this.props.selectTeam(team)}>
                Select
              </button>
            </div>
            <div className="content">{team.title}</div>
          </div>
      );
    });
    */
  }
   render() {
     return <div className="ui divided list">{this.renderList()}</div>
   }
}

const mapStateToProps = (state) => {
  return { teams: state.teams };
}

export default connect(mapStateToProps, { fetchTeamData })(TeamChoice);