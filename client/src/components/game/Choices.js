import React from 'react';
import styled from 'styled-components';
import Choice from './Choice';

const Choices = ({ choices, handleAnswerSelect, isDisabled, selectedId, correctId }) => (
  <Container>
    {choices && choices.map((choice) => (
      <Choice
        key={choice.id}
        id={choice.id}
        handleAnswerSelect={handleAnswerSelect}
        trackName={choice.trackName}
        isDisabled={isDisabled}
        isCorrect={choice.id === correctId}
        isSelected={choice.id === selectedId}
      />
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Choices;
