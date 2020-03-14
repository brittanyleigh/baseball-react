import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Error from "./Error";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class TeamNews extends React.Component {
  renderNews() {
    const { news, selected_team } = this.props;

    if (news.data) {
      return news.data.map(article => {
        return (
          <React.Fragment key={article.title}>
            <img src={article.urlToImage} alt={article.title} />
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`legend legend--${selected_team.className}`}
            >
              <span className="span--bold span--large">{article.title}</span>
              <br></br>
              <span className="span--italic span--transparent">
                {" "}
                --{article.source.name}{" "}
              </span>
            </a>
          </React.Fragment>
        );
      });
    }
    return null;
  }
  render() {
    const { news } = this.props;

    if (news.error) {
      return <Error />;
    }
    return (
      <div className="team_container--full">
        <Carousel showThumbs={false} showStatus={false}>
          {this.renderNews()}
        </Carousel>
      </div>
    );
  }
}

TeamNews.propTypes = {
  news: PropTypes.object.isRequired,
  selected_team: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    news: state.news,
    selected_team: state.team.team
  };
};

export default connect(mapStateToProps)(TeamNews);
