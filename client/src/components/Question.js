import React, { useState, useEffect } from 'react';
import Button from './Button';
import Choices from './Choices';
import styled from 'styled-components';

const Question = ({ choices, correct, onQuestionFinish }) => {
  const [isAnswerCorrect, setAnswerCorrect] = useState();
  const [isAnswerSelected, setAnswerSelected] = useState(false);

  useEffect(() => {
    setAnswerCorrect();
    setAnswerSelected(false);
  }, [choices]);

  const handleAnswerSelect = (trackId) => () => {
    setAnswerSelected(true);

    if (trackId === correct) {
      setAnswerCorrect(true);
    } else {
      setAnswerCorrect(false);
    }
  };

  const handleNextButtonClick = () => {
    onQuestionFinish(isAnswerCorrect);
  };

  return (
    <>
      <Button text="Play song" />
      <Choices choices={choices} handleAnswerSelect={handleAnswerSelect} />
      <Button isVisible={isAnswerSelected} handleClick={handleNextButtonClick} text="Next" />
    </>
  );
};

export default Question;
