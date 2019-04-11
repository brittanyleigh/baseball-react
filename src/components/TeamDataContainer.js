import React from 'react';
import { connect } from 'react-redux';

class TeamDataContainer extends React.Component {
  render() {
    return (
      <div className={`team_data_container team_data_container--${this.props.class}`}>
        <h4 className="team_data_container__heading">{this.props.heading}</h4>
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