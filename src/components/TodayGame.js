import React from 'react';
import { connect } from 'react-redux';


class TodayGame extends React.Component {
  render() {
    return this.props.today.map((game) => {
      let awayTeam, homeTeam;
      
      if (game.scheduleStatus){
        awayTeam = <div className="game__away-team">{game.awayTeam.Name} @</div>;
        homeTeam = <div className="game__home-team">{game.homeTeam.Name} </div>;
      }
      return (
        <div className="game" key={game.id}>
          <div className="game__detail">{game.time}</div>
            { awayTeam }
            { homeTeam }
        </div>
      );
    }); 
  }
}

const mapStateToProps = (state) => {
  return { 
    today: state.today 
  }
};

export default connect(mapStateToProps)(TodayGame);