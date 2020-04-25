/* eslint-disable global-require */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { selectTeam } from "../ducks/team";
import { ReactComponent as DownIcon } from "../img/down.svg";
import { ReactComponent as UpIcon } from "../img/up.svg";

const enter = 13;

function Menu(props) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector(state => state);
  const { teams, team } = store;
  const selected_team = team.team;
  const { error } = props;

  let toggleIcon, heading;
  const teamList = teams.data.map(team => {
    return (
      <li
        className={`nav__sub-li nav__sub-li--${selected_team.className}`}
        key={team.id}
        tabIndex="0"
        onClick={() => {
          dispatch(selectTeam(team));
          setIsOpen(!isOpen);
        }}
        onKeyUp={event => {
          if (event.keyCode === enter) {
            dispatch(selectTeam(team));
            setIsOpen(!isOpen);
          }
        }}
      >
        <img
          className="nav__sub-li-img"
          src={require(`../img/${team.id}.png`)}
          alt={`${team.name} logo`}
        ></img>
        <span className="nav__sub-span">{team.name}</span>
      </li>
    );
  });

  if (isOpen) {
    toggleIcon = <UpIcon className="nav__li-icon" />;
  } else {
    toggleIcon = <DownIcon className="nav__li-icon" />;
  }

  if (error) {
    heading = (
      <li className="nav__li">
        <img
          className="nav__li-img"
          src={require(`../img/mlb.png`)}
          alt="mlb logo"
        ></img>
      </li>
    );
  } else {
    heading = (
      <li
        className="nav__li"
        tabIndex="0"
        onClick={() => setIsOpen(!isOpen)}
        onKeyUp={event => {
          if (event.keyCode === enter) {
            setIsOpen(!isOpen);
          }
        }}
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
        {toggleIcon}
      </li>
    );
  }

  return (
    <header
      role="banner"
      className={`header header--${selected_team.className}`}
    >
      <div className="heading">
        <nav className="nav" role="navigation">
          <ul className={`nav__ul nav__ul--${selected_team.className}`}>
            {heading}
            {isOpen && (
              <ul
                className={`nav__sub-ul nav__sub-ul--open nav__sub-ul--${selected_team.className}`}
              >
                {teamList}
              </ul>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

Menu.propTypes = {
  error: PropTypes.bool
};

export default Menu;
