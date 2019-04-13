import React from 'react';
import { connect } from 'react-redux';
import SelectTeam from './SelectTeam';
import TeamDataContainer from './TeamDataContainer';
import YesterdayScore from './YesterdayScore';
import TodayGame from './TodayGame';
import Standings from './Standings';
import PlayerStats from './PlayerStats';
import TeamNews from './TeamNews';
import '../css/style.css';
import { fetchTeamData, getPreviousTeam, getYesterdayScore, getTodayGame, getStandings, getPlayerStats, getTeamNews, toggleMenu} from '../actions';

const playerStats = ['HR', 'AVG', 'RBI', 'OPS'];


class App extends React.Component {
  
  getTeamClass() {
    if (this.props.selected_team.Name){
      let teamName = this.props.selected_team.Name
      return teamName.split(' ').join('').toLowerCase();      
    }
  }
  
  componentDidMount() {
    this.props.fetchTeamData();
    this.props.getPreviousTeam();
    this.getAllStats();
  }
  
  getAllStats = () => {
    this.props.getYesterdayScore();
    this.props.getTodayGame();
    this.props.getStandings();
    this.props.getTeamNews();
    this.props.getPlayerStats(playerStats);
    this.props.toggleMenu();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  renderStats() {
    if (this.props.stats){
      return playerStats.map((stat) => {
        return (
          <TeamDataContainer heading={`${stat} Leaders`} class="stats" key={stat} team={this.getTeamClass()}>
            <PlayerStats statData={this.props.stats[stat]} stat={stat}/>
          </TeamDataContainer>
        );
      });
    }

  }
  
  render(){
    return (
      <React.Fragment>
        <header role="banner" className={`header header--${this.getTeamClass()}`}>
          <SelectTeam getAllStats={this.getAllStats} team={this.getTeamClass()}/>
        </header>
        <main role="main" className={`main main--${this.getTeamClass()}`}>
          <div className="container">
            <TeamDataContainer heading="Yesterday's Score" class="schedule" team={this.getTeamClass()}>
              <YesterdayScore/>
            </TeamDataContainer>
            <TeamDataContainer heading="Today's Game" class="schedule" team={this.getTeamClass()}>
              <TodayGame/>
            </TeamDataContainer>
            <TeamDataContainer heading={`${this.props.standings["@name"]} Standings`} class="full" team={this.getTeamClass()}>
              <Standings/>
            </TeamDataContainer>
            {this.renderStats()}
            <TeamDataContainer heading="News" subheading="by newsapi.org" class="full" team={this.getTeamClass()}>
              <TeamNews team={this.getTeamClass()}/>
            </TeamDataContainer>
          </div>
        </main>
      </React.Fragment>
    )    
  }
}

const mapStateToProps = (state) => {
  return { 
    standings: state.standings,
    stats: state.stats,
    selected_team: state.selected_team
  };
}

export default connect(mapStateToProps, 
  { fetchTeamData, getPreviousTeam, getYesterdayScore, getTodayGame, getStandings, getPlayerStats, getTeamNews, toggleMenu }
)(App);