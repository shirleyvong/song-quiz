import React from 'react';
import Button from '../generic/Button';
import styled from 'styled-components';

const GameOver = ({ handleGameReset, handleNewArtistSelect, numCorrect, numQuestions }) => {
  return (
    <Container>
      <h1>You got {numCorrect}/{numQuestions} correct!</h1>
      <div>
        <Button handleClick={handleGameReset} text="Play again" />
        <Button handleClick={handleNewArtistSelect} text="Select new artist" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default GameOver;
