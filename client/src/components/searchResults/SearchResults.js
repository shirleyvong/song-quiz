import React from 'react';
import List from '../generic/List';
import styled from 'styled-components';

const SearchResults = ({ results, query, handleResultSelect }) => (
  <>
    <h1>
      Search results for {query}
    </h1>

    <ListContainer>
      {results && results.length > 0
        ? <List items={results} handleItemSelect={handleResultSelect} />
        : <h1>There are no results.</h1>}
    </ListContainer>
  </>
);

const ListContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60vh;
  overflow: auto;
  padding-right: 20px;
`;

export default SearchResults;
