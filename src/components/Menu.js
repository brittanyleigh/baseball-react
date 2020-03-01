import React from "react";
import { connect } from "react-redux";
import { selectTeam } from "../ducks/team";
import { ReactComponent as DownIcon } from "../img/down.svg";
import { ReactComponent as UpIcon } from "../img/up.svg";

const initialState = {
  isOpen: false,
  team: undefined
};

class SelectTeam extends React.Component {
  state = initialState;

  componentDidMount() {
    if (this.props.selected_team) {
      this.setState({ team: this.props.selected_team.className });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected_team !== prevProps.selected_team) {
      this.setState({ team: this.props.selected_team.className });
    }
  }

  updateAllData(team) {
    this.props.selectTeam(team);
    this.toggleMenu();
  }

  updateAllDataOnEnter(event, team) {
    if (event.keyCode === 13) {
      this.updateAllData(team);
    }
  }

  toggleMenu() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  toggleMenuOnEnter(event) {
    if (event.keyCode === 13) {
      this.toggleMenu();
    }
  }

  renderMenuList() {
    return this.props.teams.data.map(team => {
      return (
        <li
          className={`nav__sub-li nav__sub-li--${this.state.team}`}
          key={team.id}
          tabIndex="0"
          onClick={() => this.updateAllData(team)}
          onKeyUp={event => this.updateAllDataOnEnter(event, team)}
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
  }

  renderToggleIcon() {
    if (this.state.isOpen) {
      return <UpIcon className="nav__li-icon" />;
    } else {
      return <DownIcon className="nav__li-icon" />;
    }
  }

  renderMenuHeading() {
    if (this.props.error) {
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
          src={require(`../img/${this.props.selected_team.id}.png`)}
          alt={`${this.props.selected_team.name} logo`}
        ></img>
        <h1 className="nav__li-h1">
          <span
            className={`nav__li-span nav__li-span--primary-${this.state.team}`}
          >
            {this.props.selected_team.name}
          </span>
        </h1>
        {this.renderToggleIcon()}
      </li>
    );
  }

  render() {
    console.log(this.props.selected_team);
    return (
      <header role="banner" className={`header header--${this.state.team}`}>
        <div className="heading">
          <nav className="nav" role="navigation">
            <ul className={`nav__ul nav__ul--${this.state.team}`}>
              {this.renderMenuHeading()}
              <ul
                className={`nav__sub-ul nav__sub-ul--${
                  this.state.isOpen ? "open" : "closed"
                } nav__sub-ul--${this.state.team}`}
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

const mapStateToProps = state => {
  return {
    teams: state.teams,
    selected_team: state.team.team
  };
};

export default connect(
  mapStateToProps,
  {
    selectTeam
  }
)(SelectTeam);
