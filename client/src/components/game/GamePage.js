import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createGame, GAME_STATE } from '../../reducers/game';
import Loading from '../generic/Loading';
import Question from './Question';
import GameOver from './GameOver';


const GamePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createGame(id));
  }, []);

  const gameState = useSelector((state) => state.game.gameState);

  switch (gameState) {
    case GAME_STATE.LOADING:
      return <Loading text="Creating game ..." />;
    case GAME_STATE.IN_PROGRESS:
      return <Question />;
    case GAME_STATE.DONE:
      return <GameOver />;
    case GAME_STATE.ERROR:
    default:
      return <div>Something unexpected occured, please try again later.</div>;
  }
};

export default GamePage;
