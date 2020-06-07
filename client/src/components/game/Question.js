import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementCorrect, finishQuestion } from '../../reducers/game';
import Button from '../generic/Button';
import Choices from './Choices';

const Question = () => {
  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState('');

  const questionNum = useSelector((state) => state.game.questionNum);
  const choices = useSelector((state) => state.game.questions[questionNum].choices);
  const correctId = useSelector((state) => state.game.questions[questionNum].correctId);

  useEffect(() => {
    setSelectedId('');
  }, [choices]);

  const handleAnswerSelect = (trackId) => {
    setSelectedId(trackId);
  };

  const handleNextButtonClick = () => {
    if (selectedId === correctId) {
      dispatch(incrementCorrect());
    }

    dispatch(finishQuestion());
  };

  return (
    <Container>
      <h1>Question {questionNum + 1}</h1>
      <div>Artist name here</div>

      <Button text="Play song" />
      <Choices
        choices={choices}
        handleAnswerSelect={handleAnswerSelect}
        selectedId={selectedId}
        correctId={correctId}
        isDisabled={!!selectedId}
      />
      <Button isVisible={!!selectedId} handleClick={handleNextButtonClick} text="Next" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
};

export default Question;
