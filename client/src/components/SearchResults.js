import React from 'react';
import ListItem from './ListItem';

const SearchResults = ({ results }) => {
  return (
    <div>
      {results && results.length > 0
        ? results.map((res) => <ListItem id={res.id} images={res.images} name={res.name} />)
        : <div>There are no results for your search.</div>
      }
    </div>
  );
};

export default SearchResults;
