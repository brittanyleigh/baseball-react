import React from "react";

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
        {React.cloneElement(this.props.children, {
          parentclass: this.parentClass()
        })}
      </div>
    );
  }
}

export default TeamDataContainer;
