import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import YesterdayScore from "./YesterdayScore.js";
import TodayGame from "./TodayGame.js";
import Standings from "./Standings.js";
import PlayerStats from "./PlayerStats";
import TeamNews from "./TeamNews";
import PlaceholderBlock from "./PlaceholderBlock";

import { getYesterdayScore } from "../ducks/yesterday";
import { getTodayGame } from "../ducks/today";
import { getDivisionStandings } from "../ducks/standings";
import { getHitterStats } from "../ducks/hitterStats";
import { getPitcherStats } from "../ducks/pitcherStats";
import { getTeamNews } from "../ducks/news";

function Main() {
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const { team, hitterStats, pitcherStats } = store;
  const selected_team = team.team;
  let hitterStatsContent, pitcherStatsContent;

  useEffect(() => {
    dispatch(getYesterdayScore());
    dispatch(getTodayGame());
    dispatch(getDivisionStandings());
    dispatch(getHitterStats());
    dispatch(getPitcherStats());
    dispatch(getTeamNews());
  }, [selected_team]);

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
        <YesterdayScore />
        <TodayGame />
        <Standings />
        {hitterStatsContent}
        {pitcherStatsContent}
        <TeamNews team={selected_team.className} />
      </div>
    </main>
  );
}

export default Main;
