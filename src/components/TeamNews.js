import React from 'react';
import { connect } from 'react-redux';

class News extends React.Component {
  render() {

    if (this.props.news) {
      return this.props.news.map((article) => {      
        return (
          <div className="news" key={article.title}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img src={article.urlToImage} alt={article.title}/>
            </a>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <span className="news__title">{article.title}</span>
              <span className="news__source">{article.source.name} </span>
            </a>
          </div>
        );
      });       
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return { 
    news: state.news
  }
};

export default connect(mapStateToProps)(News);