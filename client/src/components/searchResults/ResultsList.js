import React from 'react';
import styled from 'styled-components';
import List from '../generic/List';

const ResultsList = ({ results, query, handleResultSelect }) => (
  <>
    <h1>
      search results for "{query}"
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
  max-height: 60vh;
  overflow: auto;
  padding-right: 20px;
`;

export default ResultsList;
