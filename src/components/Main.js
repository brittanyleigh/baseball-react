import React from "react";
import { connect } from "react-redux";

import YesterdayScore from "./YesterdayScore.js";
import { getYesterdayScore } from "../ducks/yesterday";

const initialState = {
  isOpen: false,
  team: undefined
};

class Main extends React.Component {
  state = initialState;

  componentDidMount() {
    this.updateAllStats();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected_team !== prevProps.selected_team) {
      this.updateAllStats();
    }
  }

  updateAllStats() {
    this.props.getYesterdayScore();
  }

  render() {
    return (
      <main
        role="main"
        className={`main main--${this.props.selected_team.className}`}
      >
        <div className="container">
          <YesterdayScore />
        </div>
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
  { getYesterdayScore }
)(Main);
