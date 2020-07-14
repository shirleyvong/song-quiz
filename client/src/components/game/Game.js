import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createGame, GAME_STATE } from '../../reducers/game';
import Loading from '../generic/Loading';
import Question from './Question';
import GameOver from './GameOver';

const Game = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game.gameState);

  useEffect(() => {
    dispatch(createGame(id));
  }, []);

  switch (gameState) {
    case GAME_STATE.LOADING:
      return <Loading text="creating game ..." />;
    case GAME_STATE.IN_PROGRESS:
      return <Question />;
    case GAME_STATE.DONE:
      return <GameOver />;
    case GAME_STATE.ERROR:
    default:
      return <div>something unexpected occured, please try again later.</div>;
  }
};

export default Game;
