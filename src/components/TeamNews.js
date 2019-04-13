import React from 'react';
import { connect } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class News extends React.Component {
  
  renderNews() {
    if (this.props.news) {
      return this.props.news.map((article) => {      
        return (
          <React.Fragment key={article.title}>
            <img src={article.urlToImage} alt={article.title} />
            <a href={article.url} target="_blank" rel="noopener noreferrer" className={`legend legend--${this.props.team}`}>
              <span className="span--bold span--large">{article.title}</span><br></br>
              <span className="span--italic span--transparent"> --{article.source.name} </span>
            </a>
          </React.Fragment>
        );
      });       
    } else {
      return null;
    }  
  }
  render() {
    return (
      <Carousel showThumbs={false} showStatus={false}>
          {this.renderNews()}
      </Carousel>
    
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    news: state.news
  }
};

export default connect(mapStateToProps)(News);