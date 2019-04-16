import React from 'react';
import { connect } from 'react-redux';
import Error from './Error';
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
          <div className={` ${this.props.parentClass}__row`} key={player.player.ID}>
            <span className={` ${this.props.parentClass}__span`}>{player.player.FirstName} {player.player.LastName}</span>
            <span className={` ${this.props.parentClass}__span`}>{player.stats[statKey]['#text']}</span> 
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
  }
};

export default connect(mapStateToProps)(PlayerStats);