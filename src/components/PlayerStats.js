import React from 'react';
import { connect } from 'react-redux';

class PlayerStats extends React.Component {
  
  render() {
    if (this.props.statData) {
      let statKey;
      if (this.props.stat === 'AVG'){
        statKey = 'BattingAvg';
      } else if (this.props.stat === 'HR'){
        statKey = 'Homeruns';
      } else if (this.props.stat === 'RBI'){
        statKey = 'RunsBattedIn';
      } else if (this.props.stat === 'OPS'){
        statKey = 'BatterOnBasePlusSluggingPct';
      }
      return this.props.statData.map((player) => {      
        return (
          <div key={player.player.ID}>
            <div>{player.player.FirstName} {player.player.LastName} {player.stats[statKey]['#text']}</div>
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
    stats: state.stats,
    avg: state.stats.AVG
  }
};

export default connect(mapStateToProps)(PlayerStats);