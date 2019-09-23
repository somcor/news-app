import React from 'react';

const SingleNews = (props) => {
    console.log(props);
    var postObject = props.articles.filter(obj => {
        return obj.slug === props.match.params.slug
    })
    if (postObject[0]) {
        var postId = postObject[0].id;
    }
    if (postId >= 0) {
        return (
            <div className="article">
                <img className="article-img" src={props.articles[postId].urlToImage} />
                <div className="article-title">{props.articles[postId].title}</div>
                <div className="article-desc">{props.articles[postId].description}</div>
                <div className="back-link" onClick={() => props.history.goBack()}>&laquo; Go Back</div>
            </div>   
        )
    } else {
        return null;
    }
};
  
export default SingleNews;
