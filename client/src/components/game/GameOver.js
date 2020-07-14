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
  const questions = useSelector((state) => state.game.questions);

  const trackList = [];
  questions.forEach((q) => {
    for (let i = 0; i < q.choices.length; i++) {
      const choice = q.choices[i];
      if (q.correctId === choice.id) {
        trackList.push({
          name: choice.trackName,
          externalUrl: choice.externalUrl,
        });

        break;
      }
    }
  });

  const selectNewArtist = () => {
    history.push('/');
  };

  const selectReplayGame = () => {
    dispatch(replayGame());
  };

  return (
    <Container>
      <h1>you got {numCorrect}/{questions.length} correct!</h1>
      Featured songs:
      <ol>
        {trackList.map((track) => (
          <li>
            <Link href={track.externalUrl} target="_blank" rel="noreferrer">{track.name}</Link>
          </li>
        ))}
      </ol>
      <div>
        <Button handleClick={selectReplayGame} text="Play again" />
        <Button handleClick={selectNewArtist} text="Select new artist" />
      </div>
    </Container>
  );
};

const Link = styled.a`
  color: #333333;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default GameOver;
