import React from 'react';
import { connect } from 'react-redux';
import { selectTeam, getYesterdayScore, getTodayGame, getStandings, getPlayerStats } from '../actions';

class SelectTeam extends React.Component {
  
  updateAllData(team) {
    this.props.selectTeam(team);
    this.props.getYesterdayScore();
    this.props.getTodayGame();
    this.props.getStandings();
    this.props.getPlayerStats(['HR', 'AVG', 'RBI', 'OPS']);
  }
  
  renderList(){
    return this.props.teams.map((team) => {
      return (
          <li className="nav__li" key={team.ID}>
            <button className="ui button primary" onClick={() => this.updateAllData(team)}>
              {team.City} {team.Name}
            </button>
          </li>
      );
    });
  }
  
   render() {
     console.log(this.props);
     return (
       <React.Fragment>
         <h1>{ this.props.selected_team.Name }</h1>
         <div className="heading">
           <nav className="nav">
             <ul className="nav__ul">
               {this.renderList()}
             </ul>
           </nav>
         </div>
       </React.Fragment>
     )
   }
}

const mapStateToProps = (state) => {
  return { 
    teams: state.teams,
    selected_team: state.selected_team,
    standings: state.standings,
    stats: state.stats,
    yesterday: state.yesterday
   };
}

export default connect(mapStateToProps, { selectTeam, getYesterdayScore, getTodayGame, getStandings, getPlayerStats })(SelectTeam);