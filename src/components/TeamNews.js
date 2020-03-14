import React from "react";
import { connect } from "react-redux";

import Error from "./Error";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class News extends React.Component {
  renderNews() {
    const { news, team } = this.props;

    if (news.data) {
      return news.data.map(article => {
        return (
          <React.Fragment key={article.title}>
            <img src={article.urlToImage} alt={article.title} />
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`legend legend--${team}`}
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
    } else {
      return null;
    }
  }
  render() {
    const { news } = this.props;

    if (news.error) {
      return <Error />;
    } else {
      return (
        <div className="team_container--full">
          <Carousel showThumbs={false} showStatus={false}>
            {this.renderNews()}
          </Carousel>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    news: state.news
  };
};

export default connect(mapStateToProps)(News);
