import React from 'react';
import { connect } from 'react-redux';

class PlayerStats extends React.Component {
  render() {
    if (this.props.stat) {
      return this.props.stat.map((player) => {      
        return (
          <div key={player.player.ID}>
            <div>{player.player.FirstName} {player.player.LastName}</div>
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