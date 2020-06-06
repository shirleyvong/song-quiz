import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../generic/Button';
import Choices from './Choices';

const Question = ({ choices, correctId, onQuestionFinish }) => {
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    setSelectedId('');
  }, [choices]);

  const handleAnswerSelect = (trackId) => {
    setSelectedId(trackId);
  };

  const handleNextButtonClick = () => {
    onQuestionFinish(true);
  };

  return (
    <>
      <Button text="Play song" />
      <Choices
        choices={choices}
        handleAnswerSelect={handleAnswerSelect}
        selectedId={selectedId}
        correctId={correctId}
        isDisabled={!!selectedId}
      />
      <Button isVisible={!!selectedId} handleClick={handleNextButtonClick} text="Next" />
    </>
  );
};

Question.propTypes = {
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
  correctId: PropTypes.string.isRequired,
  onQuestionFinish: PropTypes.func.isRequired,
};

export default Question;
