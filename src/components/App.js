import React from 'react';
import { useSelector, useDispatch } from "react-redux";

const applyFilter = searchTerm => article =>
  article.title.toLowerCase().includes(searchTerm.toLowerCase());

const App = () => {
  const articles = useSelector((state) => state.articlesState.articles);
  const searchTerm = useSelector((state) => state.searchState.searchTerm);
  const dispatch = useDispatch();
  const onSearch = searchTerm => dispatch({ type: "SEARCH_SET", searchTerm });
  return (
    <div>
      <Search value={searchTerm} onSearch={onSearch}>
        <p>Search</p>
      </Search>

      <Articles articles={articles.filter(applyFilter(searchTerm))} />

      <p>Take the journey to learn Redux in <a href={'https://roadtoreact.com/'}>Taming the State in React</a></p>
    </div>
  );
}

const Search = ({ value, onSearch, children }) =>
  <div>
    {children} <input
      value={value}
      onChange={event => onSearch(event.target.value)}
      type="text"
    />
  </div>

const Articles = ({ articles }) =>
  <ul>
    {articles.map(article =>
      <li key={article.id}>
        <Article article={article} />
      </li>
    )}
  </ul>

const Article = ({ article }) =>
  <a href={article.url}>{article.title}</a>

export default App;
