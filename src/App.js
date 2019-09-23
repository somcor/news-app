import React from 'react';
import axios from 'axios';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import NewsList from './NewsList/NewsList';
import SingleNews from './SingleNews/SingleNews';
import './App.css';

function slugify(string) {
  const a = 'àáäâãåăæąçćčđďèéěėëêęǵḧìíïîįłḿǹńňñòóöôœøṕŕřßśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
  const b = 'aaaaaaaaacccddeeeeeeeghiiiiilmnnnnooooooprrssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      splitArticles: [],
    }
  }

  splitArticlesOnPages = (articles, itemsPerPage) => {
    var index = 0;
    var arrayLength = articles.length;
    var splitArticles = [];
    
    for (index = 0; index < arrayLength; index += itemsPerPage) {
        var myChunk = articles.slice(index, index+itemsPerPage);
        splitArticles.push(myChunk);
    }
  
    return splitArticles;
  }

  componentDidMount() {
    axios.get(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=38be583cb06748129671194eadf17de0`)
      .then(res => {
        const articles = res.data.articles;
        articles.map((article, index) => {
          var slug = slugify(article.title);
          article.slug = slug;
          article.id = index;
        });
        let splitArticles = this.splitArticlesOnPages(articles, 5);
        this.setState({
          articles: articles,
          splitArticles: splitArticles
        });
      });

  }

  render(){
    const constNewsList = (props) => {
      return (
        <div>
          <div>
            <NewsList 
              {...props}
              splitArticles={this.state.splitArticles}
            />
          </div>
          <div className="pagination">
            {this.state.splitArticles.map((page, index) => {
              if (index === 0 ) {
                return <NavLink exact className="pagination-link" activeClassName="active" to={'/'} key={index}>{index + 1}</NavLink>
              } else {
                return <NavLink className="pagination-link" activeClassName="active" to={'/' + (index + 1)} key={index}>{index + 1}</NavLink>
              }
            })}
          </div>
        </div>
      );
    }
    const constSingleNews = (props) => {
      return (
        <SingleNews 
          {...props}
          articles={this.state.articles}
        />
      );
    }
    return(
      <div className="App">
        <div className="container">
          <div className="header">Hacker News</div>
          <Switch>
            <Redirect from='/1' to='/'/>
            <Route path="/news/:slug" render={constSingleNews} />
            <Route path="/" render={constNewsList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;