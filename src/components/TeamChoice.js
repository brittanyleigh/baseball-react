import React from 'react';
import { connect } from 'react-redux';
import { selectTeam } from '../actions';

class TeamChoice extends React.Component {
  renderList(){
    
    return this.props.teams.map((team) => {
      return (
          <li className="nav__li" key={team.ID}>
            <button className="ui button primary" onClick={() => this.props.selectTeam(team)}>
              {team.City} {team.Name}
            </button>
          </li>
      );
    });
    
  }
   render() {
     return (
       <header role="banner">
         <h1>{ this.props.selected_team.Name }</h1>
         <div className="heading">
           <nav className="nav">
             <ul className="nav__ul">
               {this.renderList()}
             </ul>
           </nav>
         </div>
       </header>
     )
   }
}

const mapStateToProps = (state) => {
  return { 
    teams: state.teams,
    selected_team: state.selected_team
   };
}

export default connect(mapStateToProps, { selectTeam })(TeamChoice);