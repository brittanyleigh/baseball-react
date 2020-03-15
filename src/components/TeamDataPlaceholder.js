import React from "react";
import PropTypes from "prop-types";

class TeamDataPlaceholder extends React.Component {
  renderRows() {
    const { placeholderRows } = this.props;
    const rows = [];
    for (let i = 0; i < placeholderRows; i++) {
      rows.push(<div className="team_container__placeholder" key={i} />);
    }
    return rows;
  }

  render() {
    const { team, heading, className } = this.props;

    return (
      <div className={`team_container team_container--${className} `}>
        <h4
          className={`team_container__heading team_container__heading--${team}`}
        >
          {heading}
        </h4>
        {this.renderRows()}
      </div>
    );
  }
}

TeamDataPlaceholder.propTypes = {
  heading: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  placeholderRows: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default TeamDataPlaceholder;
