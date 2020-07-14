import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const Search = () => {
  return (
    <Container>
      <Text>
        <Title>🎹</Title>
        <Title>melody</Title>
        <p>test your knowledge of music by your favourite artists</p>
      </Text>
      <h2>find artist</h2>
      <SearchBar />
    </Container>
  );
};

const Title = styled.h1`
  margin-bottom: 0px;
`

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-bottom: 1px solid white;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Search;
