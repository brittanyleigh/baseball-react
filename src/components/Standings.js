import React from 'react';
import { connect } from 'react-redux';

class Standings extends React.Component {
  formatAVG(average){
    return average.slice(1);
  }
  
  renderTeams(){
    if (this.props.standings.teamentry) {
      return this.props.standings.teamentry.map((team) => {      
        return (
          <tr className={` ${this.props.parentClass}__tr standings`} key={team.team.ID}>
            <td className={`${this.props.parentClass}__item`}>{team.rank} </td>
            <td className={`${this.props.parentClass}__item ${this.props.parentClass}__item--grow`}>
              <span className="standings__team-name">{team.team.City} {team.team.Name}</span> 
              <span className="standings__team-abbreviation">{team.team.Abbreviation}</span> 
            </td>
            <td className={`${this.props.parentClass}__item standings--winslosses-${team.rank}`}>{team.stats.Wins["#text"]}-{team.stats.Losses["#text"]} </td>
            <td className={`${this.props.parentClass}__item`}>{this.formatAVG(team.stats.WinPct["#text"])} </td>
            <td className={`${this.props.parentClass}__item`}>{team.stats.GamesBack["#text"]}</td>
          </tr>
        );
      });       
    } else {
      return null;
    }
  }
  
  render() {
    if (this.props.standings.teamentry) {
      return (
        <table className={`${this.props.parentClass}__table`}>
          <thead>
            <tr className={`${this.props.parentClass}__tr ${this.props.parentClass}__tr-heading `}>
              <td></td>
              <td></td>
              <td className={`${this.props.parentClass}__tr-heading-item`}>W-L</td>
              <td className={`${this.props.parentClass}__tr-heading-item`}>AVG</td>
              <td className={`${this.props.parentClass}__tr-heading-item`}>GB</td>
            </tr>
          </thead>
          <tbody>
            {this.renderTeams()}  
          </tbody>
        </table>  
      )      
    } else {
      return null;
    }

  }
}

const mapStateToProps = (state) => {
  return { 
    standings: state.standings
  }
};

export default connect(mapStateToProps)(Standings);