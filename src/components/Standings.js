import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Error from "./Error";
import TeamDataContainer from "./TeamDataContainer";

class Standings extends React.Component {
  formatAVG(average) {
    return average.slice(1);
  }

  renderTeams() {
    const { standings } = this.props;

    if (standings.data) {
      return standings.data.map(team => {
        return (
          <tr className=" team_container__tr standings" key={team.team.id}>
            <td className="team_container__item">{team.divisionRank} </td>
            <td className="team_container__item team_container__item--grow">
              <span className="standings__team-name">{team.team.name}</span>
              <span className="standings__team-abbreviation">
                {/*{team.team.Abbreviation} */}
              </span>
            </td>
            <td className="team_container__item  team_container__item--center">
              {team.leagueRecord.wins}-{team.leagueRecord.losses}{" "}
            </td>
            <td className="team_container__item team_container__item--center">
              {team.leagueRecord.pct}{" "}
            </td>
            <td className="team_container__item team_container__item--center">
              {team.divisionGamesBack}
            </td>
          </tr>
        );
      });
    }
    return null;
  }

  render() {
    const { standings, selected_team } = this.props;

    if (standings.data) {
      return (
        <TeamDataContainer
          heading="Standings"
          className="full"
          team={selected_team.className}
        >
          <table className="team_container__table">
            <thead>
              <tr className="team_container__tr team_container__tr-heading ">
                <td></td>
                <td></td>
                <td className="team_container__tr-heading-item">W-L</td>
                <td className="team_container__tr-heading-item">AVG</td>
                <td className="team_container__tr-heading-item">GB</td>
              </tr>
            </thead>
            <tbody>{this.renderTeams()}</tbody>
          </table>
        </TeamDataContainer>
      );
    } else if (standings.error) {
      return <Error />;
    }
    return null;
  }
}

Standings.propTypes = {
  standings: PropTypes.object.isRequired,
  selected_team: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    standings: state.standings,
    selected_team: state.team.team
  };
};

export default connect(mapStateToProps)(Standings);
