import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { selectTeam } from "../ducks/team";
import { ReactComponent as DownIcon } from "../img/down.svg";
import { ReactComponent as UpIcon } from "../img/up.svg";

const initialState = {
  isOpen: false
};

const enter = 13;

class Menu extends React.Component {
  state = initialState;

  selectTeam(team) {
    this.props.selectTeam(team);
    this.toggleMenu();
  }

  selectTeamOnEnter(event, team) {
    if (event.keyCode === enter) {
      this.selectTeam(team);
    }
  }

  toggleMenu() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  toggleMenuOnEnter(event) {
    if (event.keyCode === enter) {
      this.toggleMenu();
    }
  }

  renderMenuList() {
    const { selected_team, teams } = this.props;

    return teams.data.map(team => {
      return (
        <li
          className={`nav__sub-li nav__sub-li--${selected_team.className}`}
          key={team.id}
          tabIndex="0"
          onClick={() => this.selectTeam(team)}
          onKeyUp={event => this.selectTeamOnEnter(event, team)}
        >
          {/* eslint-disable global-require */}
          <img
            className="nav__sub-li-img"
            src={require(`../img/${team.id}.png`)}
            alt={`${team.name} logo`}
          ></img>
          <span className="nav__sub-span">{team.name}</span>
        </li>
      );
    });
  }

  renderToggleIcon() {
    if (this.state.isOpen) {
      return <UpIcon className="nav__li-icon" />;
    }
    return <DownIcon className="nav__li-icon" />;
  }

  renderMenuHeading() {
    const { error, selected_team } = this.props;

    if (error) {
      return (
        <li className="nav__li">
          <img
            className="nav__li-img"
            src={require(`../img/mlb.png`)}
            alt="mlb logo"
          ></img>
        </li>
      );
    }
    return (
      <li
        className="nav__li"
        tabIndex="0"
        onClick={() => this.toggleMenu()}
        onKeyUp={event => this.toggleMenuOnEnter(event)}
      >
        <img
          className="nav__li-img"
          src={require(`../img/${selected_team.id}.png`)}
          alt={`${selected_team.name} logo`}
        ></img>
        <h1 className="nav__li-h1">
          <span
            className={`nav__li-span nav__li-span--primary-${selected_team.className}`}
          >
            {selected_team.name}
          </span>
        </h1>
        {this.renderToggleIcon()}
      </li>
    );
  }

  render() {
    const { selected_team } = this.props;
    const { isOpen } = this.state;

    return (
      <header
        role="banner"
        className={`header header--${selected_team.className}`}
      >
        <div className="heading">
          <nav className="nav" role="navigation">
            <ul className={`nav__ul nav__ul--${selected_team.className}`}>
              {this.renderMenuHeading()}
              <ul
                className={`nav__sub-ul nav__sub-ul--${
                  isOpen ? "open" : "closed"
                } nav__sub-ul--${selected_team.className}`}
              >
                {this.renderMenuList()}
              </ul>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

Menu.propTypes = {
  teams: PropTypes.object.isRequired,
  selected_team: PropTypes.object.isRequired,
  selectTeam: PropTypes.func.isRequired,
  error: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    teams: state.teams,
    selected_team: state.team.team
  };
};

export default connect(
  mapStateToProps,
  { selectTeam }
)(Menu);
