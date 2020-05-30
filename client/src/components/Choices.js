import React from 'react';
import styled from 'styled-components';

const Choices = ({ choices, handleAnswerSelect }) => {
  return (
    <Container>
      {choices.map((choice) => (
        <Choice key={choice.id} onClick={handleAnswerSelect(choice.id)}>
          {choice.trackName}
        </Choice>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Choice = styled.button`
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: #333333;
  min-width: 300px;
  margin: 5px;
  padding: 10px;
  width: 100%;
  border-radius: 20px;
  border: none;
  font-family: inherit;
  color: inherit;
  font-size: 1.2rem;

  &:hover {
    font-weight: bold;
    background-color: #575757;
    transition: font-weight 0.2s;
    transition: background-color 0.2s;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;
export default Choices;
