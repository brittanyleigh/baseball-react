import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import YesterdayScore from "./YesterdayScore.js";
import TodayGame from "./TodayGame.js";
import Standings from "./Standings.js";
import PlayerStats from "./PlayerStats";
import TeamNews from "./TeamNews";

import { getYesterdayScore } from "../ducks/yesterday";
import { getTodayGame } from "../ducks/today";
import { getDivisionStandings } from "../ducks/standings";
import { getHitterStats } from "../ducks/hitterStats";
import { getPitcherStats } from "../ducks/pitcherStats";
import { getTeamNews } from "../ducks/news";

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
    this.props.getHitterStats();
    this.props.getPitcherStats();
    this.props.getTeamNews();
  }

  renderHitterStats() {
    const { hitterStats, selected_team } = this.props;

    if (hitterStats && hitterStats.data) {
      const statKeys = Object.keys(hitterStats.data);
      return statKeys.map(stat => {
        return (
          <PlayerStats
            key={stat}
            stat={hitterStats.data[stat]}
            className={selected_team.className}
            statName={stat}
          />
        );
      });
    }
    return null;
  }

  renderPitcherStats() {
    const { pitcherStats, selected_team } = this.props;

    if (pitcherStats && pitcherStats.data) {
      const statKeys = Object.keys(pitcherStats.data);
      return statKeys.map(stat => {
        return (
          <PlayerStats
            key={stat}
            stat={pitcherStats.data[stat]}
            className={selected_team.className}
            statName={stat}
          />
        );
      });
    }
    return null;
  }

  render() {
    const { selected_team } = this.props;
    return (
      <main role="main" className={`main main--${selected_team.className}`}>
        <div className="container">
          <YesterdayScore />
          <TodayGame />
          <Standings />
          {this.renderHitterStats()}
          {this.renderPitcherStats()}
          <TeamNews team={selected_team.className} />
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  selected_team: PropTypes.object.isRequired,
  hitterStats: PropTypes.object,
  pitcherStats: PropTypes.object,
  getYesterdayScore: PropTypes.func.isRequired,
  getTodayGame: PropTypes.func.isRequired,
  getDivisionStandings: PropTypes.func.isRequired,
  getHitterStats: PropTypes.func.isRequired,
  getPitcherStats: PropTypes.func.isRequired,
  getTeamNews: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    selected_team: state.team.team,
    hitterStats: state.hitterStats,
    pitcherStats: state.pitcherStats
  };
};

export default connect(
  mapStateToProps,
  {
    getYesterdayScore,
    getTodayGame,
    getDivisionStandings,
    getHitterStats,
    getPitcherStats,
    getTeamNews
  }
)(Main);
