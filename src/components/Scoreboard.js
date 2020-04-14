import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import YesterdayScore from "./YesterdayScore.js";
import TodayGame from "./TodayGame.js";

import { getSeasonDates } from "../ducks/season";

function Scoreboard() {
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const { season } = store;
  const today = new Date();
  const seasonStarted = today - new Date(season.data.start) > 0;
  const seasonOver = today - new Date(season.data.end) > 0;

  useEffect(() => {
    dispatch(getSeasonDates());
  }, []);

  if (seasonStarted && !seasonOver) {
    return (
      <React.Fragment>
        <h2 className="section-heading">Scoreboard</h2>
        <YesterdayScore />
        <TodayGame />
      </React.Fragment>
    );
  }
  return null;
}

export default Scoreboard;
