import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Scoreboard from "./Scoreboard";
import Standings from "./Standings.js";
import PlayerStats from "./PlayerStats";
import PlaceholderBlock from "./PlaceholderBlock";
import YearHeading from "./YearHeading";

import { getYesterdayScore } from "../ducks/yesterday";
import { getTodayGame } from "../ducks/today";

function Main() {
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const { team, hitterStats, pitcherStats } = store;
  const selected_team = team.team;
  let hitterStatsContent, pitcherStatsContent;

  useEffect(() => {
    dispatch(getYesterdayScore());
    dispatch(getTodayGame());
  }, [selected_team, dispatch]);

  if (hitterStats.isFetching) {
    hitterStatsContent = (
      <PlaceholderBlock placeholderRows={3} team={selected_team.className} />
    );
  } else if (hitterStats && hitterStats.data) {
    const statKeys = Object.keys(hitterStats.data);
    hitterStatsContent = statKeys.map(stat => {
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

  if (pitcherStats.isFetching) {
    pitcherStatsContent = (
      <PlaceholderBlock placeholderRows={3} team={selected_team.className} />
    );
  } else if (pitcherStats && pitcherStats.data) {
    const statKeys = Object.keys(pitcherStats.data);
    pitcherStatsContent = statKeys.map(stat => {
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

  return (
    <main role="main" className={`main main--${selected_team.className}`}>
      <div className="container">
        <Scoreboard />
        <YearHeading team={selected_team} />
        <Standings />
        {hitterStatsContent}
        {pitcherStatsContent}
        {/*
        // NOTE: newsapi.org no longer supports free plans (only works locally)
        // TODO: find alternative news API for this component
        <h2 className="section-heading">Team News</h2>
        <TeamNews team={selected_team.className} />
        */}
      </div>
    </main>
  );
}

export default Main;
