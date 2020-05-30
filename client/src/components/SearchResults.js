import React from 'react';
import List from './generic/List';

const SearchResults = ({ results, query, handleResultSelect }) => (
  <>
    <h1>
      Search results for {query}
    </h1>

    {results && results.length > 0
      ? <List items={results} handleItemSelect={handleResultSelect} />
      : <h1>There are no results.</h1>}
  </>
);

export default SearchResults;
