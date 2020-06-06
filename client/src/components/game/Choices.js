import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Choice from './Choice';

const Choices = ({
  choices, handleAnswerSelect, isDisabled, correctId, selectedId,
}) => (
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

Choices.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      albumName: PropTypes.string.isRequired,
      artists: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
      ),
      id: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
      trackName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleAnswerSelect: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  selectedId: PropTypes.string,
  correctId: PropTypes.string.isRequired,
};

Choices.defaultProps = {
  selectedId: undefined,
};

export default Choices;
