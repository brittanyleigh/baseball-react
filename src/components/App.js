import React from "react";
import { connect } from "react-redux";
import Menu from "./Menu";
import Main from "./Main";
import TeamDataContainer from "./TeamDataContainer";
import YesterdayScore from "./YesterdayScore";
import TodayGame from "./TodayGame";
import Standings from "./Standings";
import PlayerStats from "./PlayerStats";
import TeamNews from "./TeamNews";
import Error from "./Error";
import "../css/style.css";

import { fetchTeamData } from "../ducks/teams";
import { getPreviousTeam } from "../ducks/team";
import { selectTeam } from "../ducks/team";

const initialState = {
  selected_team: undefined
};

class App extends React.Component {
  state = initialState;

  async componentDidMount() {
    await this.props.fetchTeamData();
    this.props.getPreviousTeam();
    if (!this.props.selected_team) {
      this.props.selectTeam(this.props.teams.data[0]);
    }
  }

  render() {
    if (this.props.teams.isFetching || !this.props.selected_team) {
      return (
        <div className="loader">
          <img
            className="loader__img"
            src={require(`../img/baseball.svg`)}
            alt="spinning baseball loader icon"
          ></img>
        </div>
      );
    } else if (this.props.selected_team) {
      return (
        <React.Fragment>
          <Menu />
          <Main />
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    standings: state.standings,
    stats: state.stats,
    hitterStats: state.hitterStats,
    pitcherStats: state.pitcherStats,
    selected_team: state.team.team,
    today: state.today,
    yesterday: state.yesterday,
    news: state.news,
    teams: state.teams
  };
};

export default connect(
  mapStateToProps,
  { fetchTeamData, getPreviousTeam, selectTeam }
)(App);
