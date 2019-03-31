import React from 'react';
import { connect } from 'react-redux';


class YesterdayScore extends React.Component {
  render() {
    return this.props.yesterday.map((game) => {
      let outcome, awayTeam, homeTeam;
      
      // get game status & win/loss if played
      if (game.isUnplayed === "true") {
        outcome = game.game.scheduleStatus;
      } else {
        if (this.props.team.ID === game.game.homeTeam.ID && parseInt(game.homeScore) > parseInt(game.awayScore)) {
          outcome = "W";
        } else if (this.props.team.ID === game.game.awayTeam.ID && parseInt(game.awayScore) > parseInt(game.homeScore)) {
          outcome = "W";
        } else {
          outcome = "L";
        }
      }
      
      if (game.isUnplayed === "false") {
        awayTeam = <div className="game__away-team">{game.game.awayTeam.Name}: { game.awayScore }</div>;
        homeTeam = <div className="game__home-team">{game.game.homeTeam.Name}: { game.homeScore }</div>;
      }
      
      return (
        <div className="game" key={game.game.ID}>
          <div className="game__detail">{ outcome }</div>
            { awayTeam }
            { homeTeam }
        </div>
      );
    }); 
  }
}

const mapStateToProps = (state) => {
  return { 
    yesterday: state.yesterday,
    team: state.selected_team
  }
};

export default connect(mapStateToProps)(YesterdayScore);