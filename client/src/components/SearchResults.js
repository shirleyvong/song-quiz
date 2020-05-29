import React from 'react';
import SearchResultItem from './SearchResultItem';

const SearchResults = ({ results, query }) => {
  return (
    <>
      <h1>Search results for {query}</h1>

      {results && results.length > 0
        ? results.map((res) => <SearchResultItem id={res.id} images={res.images} name={res.name} />)
        : <h1>There are no results.</h1>
      }
    </>
  );
};

export default SearchResults;
