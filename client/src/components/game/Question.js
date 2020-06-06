import React, { useState, useEffect } from 'react';
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

export default Question;
