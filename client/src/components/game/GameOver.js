import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { replayGame } from '../../reducers/game';
import Button from '../generic/Button';

const GameOver = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const numCorrect = useSelector((state) => state.game.numCorrect);
  const numQuestions = useSelector((state) => state.game.questions.length);

  const selectNewArtist = () => {
    history.push('/');
  };

  const selectReplayGame = () => {
    dispatch(replayGame());
  };

  return (
    <Container>
      <h1>You got {numCorrect}/{numQuestions} correct!</h1>
      <div>
        <Button handleClick={selectReplayGame} text="Play again" />
        <Button handleClick={selectNewArtist} text="Select new artist" />
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
