import React from "react";
import PropTypes from "prop-types";
import Block from "./Block";

function renderStats(stat) {
  return stat.map(player => {
    return (
      <div className="block__row" key={player.person.id}>
        <span className="block__span">{player.person.fullName}</span>
        <span className="block__span">{player.value}</span>
      </div>
    );
  });
}

function statName(statName) {
  switch (statName) {
    case "homeRuns":
      return "Home Runs";
    case "runsBattedIn":
      return "RBIs";
    case "battingAverage":
      return "Batting Average";
    case "onBasePlusSlugging":
      return "OPS";
    case "wins":
      return "Wins";
    case "earnedRunAverage":
      return "ERA";
    default:
      return "Misc. Stats";
  }
}

function PlayerStats(props) {
  return (
    <Block heading={statName(props.statName)} team={props.className}>
      {renderStats(props.stat)}
    </Block>
  );
}

PlayerStats.propTypes = {
  className: PropTypes.string.isRequired,
  statName: PropTypes.string.isRequired,
  stat: PropTypes.array.isRequired
};

export default PlayerStats;
