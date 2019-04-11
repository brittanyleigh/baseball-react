import React from 'react';
import { connect } from 'react-redux';


class YesterdayScore extends React.Component {
  render() {
    return this.props.yesterday.map((game) => {
      let outcome, awayTeam, homeTeam, key;
      
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
        awayTeam = <div className="game__team game__team--away">{game.game.awayTeam.Name}: { game.awayScore }</div>;
        homeTeam = <div className="game__team game__team--home">{game.game.homeTeam.Name}: { game.homeScore }</div>;
      }
      
      if (game.game.ID) {
        key = game.game.ID;
      } else {
        key = game.id;
      }
      
      return (
        <div className="game game--yesterday" key={key}>
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