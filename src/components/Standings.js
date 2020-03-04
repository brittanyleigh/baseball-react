import React from "react";
import { connect } from "react-redux";
import Error from "./Error";
import TeamDataContainer from "./TeamDataContainer";

class Standings extends React.Component {
  formatAVG(average) {
    return average.slice(1);
  }

  renderTeams() {
    if (this.props.standings.data) {
      return this.props.standings.data.map(team => {
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
    } else {
      return null;
    }
  }

  render() {
    if (this.props.standings.data) {
      return (
        <TeamDataContainer
          heading="Standings"
          class="full"
          team={this.props.team.className}
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
    } else if (this.props.standings.error) {
      return <Error />;
    }
  }
}

const mapStateToProps = state => {
  return {
    standings: state.standings,
    team: state.team.team
  };
};

export default connect(mapStateToProps)(Standings);
