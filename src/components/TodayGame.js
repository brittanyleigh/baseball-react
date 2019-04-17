import React from 'react';
import { connect } from 'react-redux';
import Error from './Error';

class TodayGame extends React.Component {
  render() {
    if (this.props.today.error){
      return (
        <Error />
      )
    } else {
      return this.props.today.map((game) => {
        let awayTeam, homeTeam;
        
        if (game.scheduleStatus){
          awayTeam = <div className="game__team game__team--away">{game.awayTeam.Name} @</div>;
          homeTeam = <div className="game__team game__team--home">{game.homeTeam.Name} </div>;
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
}

const mapStateToProps = (state) => {
  return { 
    today: state.today 
  }
};

export default connect(mapStateToProps)(TodayGame);