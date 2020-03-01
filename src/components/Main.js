import React from "react";
import { connect } from "react-redux";

import YesterdayScore from "./YesterdayScore.js";

const initialState = {
  isOpen: false,
  team: undefined
};

class Main extends React.Component {
  state = initialState;

  render() {
    return (
      <main
        role="main"
        className={`main main--${this.props.selected_team.className}`}
      >
        <div className="container"></div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    selected_team: state.team.team
  };
};

export default connect(
  mapStateToProps,
  {}
)(Main);
