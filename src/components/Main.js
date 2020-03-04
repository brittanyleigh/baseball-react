import React from "react";
import { connect } from "react-redux";

import YesterdayScore from "./YesterdayScore.js";
import TodayGame from "./TodayGame.js";
import Standings from "./Standings.js";

import { getYesterdayScore } from "../ducks/yesterday";
import { getTodayGame } from "../ducks/today";
import { getDivisionStandings } from "../ducks/standings";

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
    this.props.getTodayGame();
    this.props.getDivisionStandings();
  }

  render() {
    console.log(this.props.standings);
    return (
      <main
        role="main"
        className={`main main--${this.props.selected_team.className}`}
      >
        <div className="container">
          <YesterdayScore />
          <TodayGame />
          <Standings />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    selected_team: state.team.team,
    standings: state.standings
  };
};

export default connect(
  mapStateToProps,
  { getYesterdayScore, getTodayGame, getDivisionStandings }
)(Main);
