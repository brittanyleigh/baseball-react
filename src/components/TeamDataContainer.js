import React from "react";
import { connect } from "react-redux";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

class TeamDataContainer extends React.Component {
  parentClass() {
    return "team_container";
  }

  renderSubHeading() {
    if (this.props.subheading) {
      return (
        <React.Fragment>
          <br></br>
          <span className="span--italic span--transparent span--small">
            {" "}
            {this.props.subheading}
          </span>
        </React.Fragment>
      );
    }
  }

  classTwo() {
    if (this.props.class2) {
      return this.parentClass() + "--" + this.props.class2;
    } else {
      return "";
    }
  }

  isReady() {
    if (this.props.ready) {
      return this.props.ready;
    } else {
      return false;
    }
  }

  placeholderRows() {
    if (this.props.placeholderRows) {
      return this.props.placeholderRows;
    } else {
      return 1;
    }
  }

  render() {
    return (
      <div
        className={`${this.parentClass()} ${this.parentClass()}--${
          this.props.class
        } ${this.classTwo()}`}
        id={this.props.id}
      >
        <h4
          className={`${this.parentClass()}__heading ${this.parentClass()}__heading--${
            this.props.team
          }`}
        >
          {this.props.heading}
          {this.renderSubHeading()}
        </h4>
        <ReactPlaceholder
          type="text"
          ready={this.isReady()}
          rows={this.placeholderRows()}
          color="#eeeeee"
        >
          {React.cloneElement(this.props.children, {
            parentclass: this.parentClass()
          })}
        </ReactPlaceholder>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(TeamDataContainer);
