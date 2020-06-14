import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const Search = () => {
  return (
    <Container>
      <h1>Search for an artist</h1>
      <SearchBar />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Search;
