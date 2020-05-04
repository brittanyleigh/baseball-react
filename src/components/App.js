/* eslint-disable global-require */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Menu from "./Menu";
import Main from "./Main";
import "../css/style.css";

import { fetchTeamData } from "../ducks/teams";
import { getPreviousTeam, selectTeam } from "../ducks/team";

function App() {
  const dispatch = useDispatch();
  const store = useSelector(state => state);
  const { teams, team } = store;
  const selected_team = team.team;

  useEffect(() => {
    dispatch(fetchTeamData());
    dispatch(getPreviousTeam());
  }, []);

  useEffect(() => {
    if (!selected_team && teams.data.length > 0) {
      dispatch(selectTeam(teams.data[0]));
    }
  }, [teams]);

  if (teams.isFetching || !selected_team) {
    return (
      <div className="loader" data-testid="loader">
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

export default App;
