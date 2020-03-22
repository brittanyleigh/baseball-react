import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Error from "./Error";
import Block from "./Block";
import PlaceholderBlock from "./PlaceholderBlock";

class Standings extends React.Component {
  formatAVG(average) {
    return average.slice(1);
  }

  renderTeams() {
    const { standings, selected_team } = this.props;

    if (standings.data.length > 0) {
      return standings.data.map(team => {
        const teamInfo = this.props.teams.data.find(teamData => {
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
    return <Error heading="Standings" team={selected_team.className} />;
  }

  render() {
    const { standings, selected_team } = this.props;

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
      <Block
        heading="Standings"
        className="full"
        team={selected_team.className}
      >
        <table className="block__table">
          <thead>
            <tr>
              <td className="block__tr-heading block__tr-heading--left">
                RANK
              </td>
              <td className="block__tr-heading block__tr-heading--left">
                TEAM
              </td>
              <td className="block__tr-heading">W-L</td>
              <td className="block__tr-heading">AVG</td>
              <td className="block__tr-heading">GB</td>
            </tr>
          </thead>
          <tbody>{this.renderTeams()}</tbody>
        </table>
      </Block>
    );
  }
}

Standings.propTypes = {
  standings: PropTypes.object.isRequired,
  selected_team: PropTypes.object.isRequired,
  teams: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    standings: state.standings,
    selected_team: state.team.team,
    teams: state.teams
  };
};

export default connect(mapStateToProps)(Standings);
