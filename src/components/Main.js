import React from "react";
import { connect } from "react-redux";

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
    if (this.props.hitterStats && this.props.hitterStats.data) {
      const statKeys = Object.keys(this.props.hitterStats.data);
      return statKeys.map(stat => {
        return (
          <PlayerStats
            stat={this.props.hitterStats.data[stat]}
            className={this.props.selected_team.className}
            statName={stat}
          />
        );
      });
    }
  }

  renderPitcherStats() {
    if (this.props.pitcherStats && this.props.pitcherStats.data) {
      const statKeys = Object.keys(this.props.pitcherStats.data);
      return statKeys.map(stat => {
        return (
          <PlayerStats
            stat={this.props.pitcherStats.data[stat]}
            className={this.props.selected_team.className}
            statName={stat}
          />
        );
      });
    }
  }

  render() {
    return (
      <main
        role="main"
        className={`main main--${this.props.selected_team.className}`}
      >
        <div className="container">
          <YesterdayScore />
          <TodayGame />
          <Standings />
          {this.renderHitterStats()}
          {this.renderPitcherStats()}
          <TeamNews team={this.props.selected_team.className} />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    selected_team: state.team.team,
    standings: state.standings,
    hitterStats: state.hitterStats,
    pitcherStats: state.pitcherStats,
    news: state.news
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
