import React from 'react';
import { connect } from 'react-redux';

class Standings extends React.Component {
  renderTeams(){
    if (this.props.standings.teamentry) {
      return this.props.standings.teamentry.map((team) => {      
        return (
          <div className={` ${this.props.parentClass}__row standings`} key={team.team.ID}>
            <span className={`${this.props.parentClass}__span`}>{team.rank} </span>
            <span className={`${this.props.parentClass}__span ${this.props.parentClass}__span--grow`}>{team.team.City} {team.team.Name} </span>
            <span className={`${this.props.parentClass}__span standings--winslosses-${team.rank}`}>{team.stats.Wins["#text"]}-{team.stats.Losses["#text"]} </span>
            <span className={`${this.props.parentClass}__span`}>%{team.stats.WinPct["#text"]} </span>
            <span className={`${this.props.parentClass}__span`}>{team.stats.GamesBack["#text"]}</span>
          </div>
        );
      });       
    } else {
      return null;
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <div className={`${this.props.parentClass}__row ${this.props.parentClass}__row-heading `}>
          <span className={`${this.props.parentClass}__span`}></span>
          <span className={`${this.props.parentClass}__span`}></span>
          <span className={`${this.props.parentClass}__span`}></span>
        </div>
        {this.renderTeams()}   
      </React.Fragment>  
    )


  }
}

const mapStateToProps = (state) => {
  return { 
    standings: state.standings
  }
};

export default connect(mapStateToProps)(Standings);