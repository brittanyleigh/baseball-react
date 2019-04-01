import React from 'react';
import { connect } from 'react-redux';

class Standings extends React.Component {
  render() {

    if (this.props.standings.teamentry) {
      return this.props.standings.teamentry.map((team) => {      
        return (
          <div className="standings" key={team.team.ID}>
            <span className="standings__rank">{team.rank} </span>
            <span className="standings__team">{team.team.City} {team.team.Name} </span>
            <span className="standings__winslosses">{team.stats.Wins["#text"]}-{team.stats.Losses["#text"]} </span>
            <span className="standings__avg">%{team.stats.WinPct["#text"]} </span>
            <span className="standings__gamesback">{team.stats.GamesBack["#text"]}</span>
          </div>
        );
      });       
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