import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementCorrect, finishQuestion } from '../../reducers/game';
import Button from '../generic/Button';
import Choices from './Choices';
import MusicPlayer from './MusicPlayer';

const Question = () => {
  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState('');

  const questionNum = useSelector((state) => state.game.questionNum);
  const choices = useSelector((state) => state.game.questions[questionNum].choices);
  const correctId = useSelector((state) => state.game.questions[questionNum].correctId);
  const songUrl = useSelector((state) => state.game.questions[questionNum].songUrl);

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
      <MusicPlayer url={songUrl} />
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

export default Question;
