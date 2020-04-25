import React from "react";
import { useSelector } from "react-redux";

import Empty from "./Empty";
import PlaceholderBlock from "./PlaceholderBlock";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function renderImage(articleImage, alt) {
  const backupImages = [
    "baseball-base.jpg",
    "baseball-stadium.jpg",
    "dirty-baseball.jpg",
    "multiple-baseballs.jpg",
    "two-baseballs.jpg"
  ];
  const index = Math.floor(Math.random() * backupImages.length);
  if (articleImage) {
    return <img src={articleImage} alt={alt} />;
  }
  /* eslint-disable-next-line */
  return <img src={require(`../img/news/${backupImages[index]}`)} alt={alt} />;
}

function renderCarouselSlides(data, selected_team) {
  return data.map(article => {
    return (
      <React.Fragment key={article.title}>
        {renderImage(article.urlToImage, article.title)}
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

function TeamNews() {
  let newsBlock;
  const store = useSelector(state => state);
  const { news, team } = store;
  const selected_team = team.team;

  if (news.isFetching) {
    newsBlock = (
      <PlaceholderBlock placeholderRows={5} team={selected_team.className} />
    );
  }
  if (news.data.length > 0) {
    newsBlock = (
      <Carousel showThumbs={false} showStatus={false}>
        {renderCarouselSlides(news.data, selected_team)}
      </Carousel>
    );
  } else {
    newsBlock = (
      <Empty heading="Team News" team={selected_team.className} error={true} />
    );
  }

  return <div className="block--full">{newsBlock}</div>;
}

export default TeamNews;
