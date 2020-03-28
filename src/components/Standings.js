import React from "react";
import { useSelector } from "react-redux";

import Empty from "./Empty";
import Block from "./Block";
import PlaceholderBlock from "./PlaceholderBlock";

function renderTeams(standings, selected_team, teams) {
  if (standings.data.length > 0) {
    return standings.data.map(team => {
      const teamInfo = teams.data.find(teamData => {
        return teamData.id === team.team.id;
      });

      return (
        <tr className=" block__tr standings" key={team.team.id}>
          <td className="block__item">{team.divisionRank} </td>
          <td className="block__item">
            <span className="standings__team-name">{team.team.name}</span>
            <span className="standings__team-abbreviation">
              {teamInfo.abbreviation}
            </span>
          </td>
          <td className="block__item  block__item--center">
            {team.leagueRecord.wins}-{team.leagueRecord.losses}{" "}
          </td>
          <td className="block__item block__item--center">
            {team.leagueRecord.pct}{" "}
          </td>
          <td className="block__item block__item--center">
            {team.divisionGamesBack}
          </td>
        </tr>
      );
    });
  }
  return (
    <Empty heading="Standings" team={selected_team.className} error={true} />
  );
}

function Standings() {
  const store = useSelector(state => state);
  const { standings, team, teams } = store;
  const selected_team = team.team;

  if (standings.isFetching) {
    return (
      <PlaceholderBlock
        placeholderRows={5}
        team={selected_team.className}
        className="full"
      />
    );
  }

  return (
    <Block heading="Standings" className="full" team={selected_team.className}>
      <table className="block__table">
        <thead>
          <tr>
            <td className="block__tr-heading block__tr-heading--left">RANK</td>
            <td className="block__tr-heading block__tr-heading--left">TEAM</td>
            <td className="block__tr-heading">W-L</td>
            <td className="block__tr-heading">AVG</td>
            <td className="block__tr-heading">GB</td>
          </tr>
        </thead>
        <tbody>{renderTeams(standings, selected_team, teams)}</tbody>
      </table>
    </Block>
  );
}

export default Standings;
