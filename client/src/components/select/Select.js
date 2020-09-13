import React from 'react';
import styled from 'styled-components';
import SearchBar from './Search';
import RecentArtists from './RecentArtists';

const Select = () => {
  return (
    <Container>
      <Text>
        <Title>🎹</Title>
        <Title>Melody</Title>
        <p>Test your knowledge of music by your favourite artists</p>
      </Text>
      <SearchBar />
      <RecentArtists />
    </Container>
  );
};

const Title = styled.h1`
  margin-bottom: 0px;
  text-transform: lowercase;
`;

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
  max-width: 800px;
`;

export default Select;
