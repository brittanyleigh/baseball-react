import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Menu from "./Menu";
import Main from "./Main";
import "../css/style.css";

import { fetchTeamData } from "../ducks/teams";
import { getPreviousTeam, selectTeam } from "../ducks/team";

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
    const { selected_team, teams } = this.props;
    if (teams.isFetching || !selected_team) {
      return (
        <div className="loader">
          {/* eslint-disable global-require */}
          <img
            className="loader__img"
            src={require(`../img/baseball.svg`)}
            alt="spinning baseball loader icon"
          ></img>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Menu />
        <Main />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  selected_team: PropTypes.object,
  teams: PropTypes.object.isRequired,
  fetchTeamData: PropTypes.func.isRequired,
  getPreviousTeam: PropTypes.func.isRequired,
  selectTeam: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    selected_team: state.team.team,
    teams: state.teams
  };
};

export default connect(
  mapStateToProps,
  { fetchTeamData, getPreviousTeam, selectTeam }
)(App);
