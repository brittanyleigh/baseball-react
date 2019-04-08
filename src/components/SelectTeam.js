import React from 'react';
import { connect } from 'react-redux';
import { selectTeam, getYesterdayScore, getTodayGame, getStandings, getPlayerStats, toggleMenu } from '../actions';

class SelectTeam extends React.Component {
  
  updateAllData(team) {
    this.props.selectTeam(team);
    this.props.getAllStats();
  }
  
  toggleMenu() {
    this.props.toggleMenu();
  }
  
  renderList(){
    return this.props.teams.map((team) => {
      return (
          <li className="nav__sub-li" key={team.ID} onClick={() => this.updateAllData(team)}>
            <img className="nav__sub-li-img" src={require(`../img/${team.ID}.png`)} alt={`${team.City} ${team.Name} logo`}></img>
            <span className="nav__sub-span">{team.City} {team.Name}</span>
          </li>
      );
    });
  }
  
   render() {
     console.log(this.props);
     if (!this.props.selected_team.ID) {
       return null;
     }
     return (
       <React.Fragment>
         <div className="heading">
           <nav className="nav">
             <ul className="nav__ul">
               <li className="nav__li" onClick={() => this.toggleMenu()}>
                 <img 
                   className="nav__li-img" 
                   src={require(`../img/${this.props.selected_team.ID}.png`)} 
                   alt={`${this.props.selected_team.City} ${this.props.selected_team.Name} logo`}>
                 </img>
                 <h1 className="nav__li-h1">{ this.props.selected_team.City } { this.props.selected_team.Name }</h1>
               </li>
               <ul className={`nav__sub-ul nav__sub-ul--${this.props.menuIsOpen}`}>
                 {this.renderList()}
               </ul>
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
    yesterday: state.yesterday,
    news: state.news,
    menuIsOpen: state.menuIsOpen
   };
}

export default connect(mapStateToProps, { selectTeam, getYesterdayScore, getTodayGame, getStandings, getPlayerStats, toggleMenu })(SelectTeam);