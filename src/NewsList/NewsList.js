import React from 'react';
import { Link } from 'react-router-dom';

const NewsList = (props) => {
    var url = props.location.pathname;
    if ( url === '/') {
      var splitArticlesElement = 0;
    } else {
      var splitArticlesElement = url.substring(1) - 1;
    }
    return (
      <div>
        { props.splitArticles[splitArticlesElement] ? props.splitArticles[splitArticlesElement].map((article, index) => (
          <div className="article" key={index}>
            <Link className="article__link" to={"/news/" + article.slug}>{article.title}</Link>
          </div>   
        )) : null }
      </div>
    )
};
  
export default NewsList;