import React from 'react';
import { connect } from 'react-redux';

class Error extends React.Component {
  render(){
    return (
      <div className={`${this.props.parentClass}__item text--center`}>
        <h5>Oh no, something went wrong!<br></br>Check back later.</h5>
      </div>
    )
  }
}

const mapStateToProps = (state) => {return { }}

export default connect(mapStateToProps, { })(Error);