import React from 'react';
import { connect } from 'react-redux';

class TeamDataContainer extends React.Component {
  render() {
    return (
      <div className={`team_data_container team_data_container--${this.props.class}`}>
        <h2 className="team_data_container__heading2">{this.props.heading}</h2>
          {this.props.children}
      </div>
    )  
  }
}

const mapStateToProps = (state) => {
  return { 
  }
};

export default connect(mapStateToProps)(TeamDataContainer);