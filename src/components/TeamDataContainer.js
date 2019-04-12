import React from 'react';
import { connect } from 'react-redux';

class TeamDataContainer extends React.Component {
  parentClass(){
    return 'team_data_container';
  }
  
  render() {
    return (
      <div className={`${this.parentClass()} ${this.parentClass()}--${this.props.class}`}>
        <h4 className={`${this.parentClass()}__heading ${this.parentClass()}__heading--${this.props.team}`}>{this.props.heading}</h4>
          {React.cloneElement(this.props.children, {parentClass: this.parentClass()})}
      </div>
    )  
  }
}

const mapStateToProps = (state) => {
  return { 
  }
};

export default connect(mapStateToProps)(TeamDataContainer);