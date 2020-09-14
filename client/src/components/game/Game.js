import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createGame, GAME_STATE } from '../../reducers/game';
import Loading from '../generic/Loading';
import Button from '../generic/Button';
import Question from './Question';
import GameOver from './GameOver';

const Game = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game.gameState);

  useEffect(() => {
    dispatch(createGame(id));
  }, [dispatch, id]);

  const selectNewArtist = () => {
    history.push('/');
  };

  switch (gameState) {
    case GAME_STATE.LOADING:
      return <Loading text="creating game ..." />;
    case GAME_STATE.IN_PROGRESS:
      return <Question />;
    case GAME_STATE.DONE:
      return <GameOver />;
    case GAME_STATE.UNSUPPORTED_ARTIST:
      return (
        <div>
          <p>This artist is not supported.</p>
          <Button handleClick={selectNewArtist} text="Select new artist" />
        </div>
      );
    case GAME_STATE.ERROR:
    default:
      return <div>something unexpected occured, please try again later.</div>;
  }
};

export default Game;
