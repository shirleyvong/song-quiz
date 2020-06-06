import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import shuffle from 'knuth-shuffle-seeded';
import styled from 'styled-components';
import Loading from '../generic/Loading';
import Question from './Question';
import GameOver from './GameOver';

const GamePage = () => {
  const CHOICES_PER_QUESTION = 4;
  const NUM_QUESTIONS = 1;

  const { id } = useParams();
  const history = useHistory();

  const [tracks, setTracks] = useState([]);
  const [roundNum, setRoundNum] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [numCorrect, setNumCorrect] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const isGameOver = roundNum >= NUM_QUESTIONS;

  useEffect(() => {
    axios.get(`/api/tracks/${id}`)
      .then((res) => {
        setTracks(res.data);
      });
  }, []);

  useEffect(() => {
    if (tracks && tracks.length > 0) {
      generateQuestions();
    }
  }, [tracks]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setIsLoading(false);
    }
  }, [questions]);

  const getRandomIndex = (maxNum) => Math.floor(Math.random() * maxNum - 1) + 1;

  const generateQuestions = () => {
    const copiedTracks = [...tracks];
    shuffle(copiedTracks);

    const newQuestions = [];
    for (let i = 0; i < NUM_QUESTIONS; i++) {
      const choices = [];
      for (let j = 0; j < CHOICES_PER_QUESTION; j++) {
        const idx = i * CHOICES_PER_QUESTION + j;
        choices.push(copiedTracks[idx]);
      }

      const randIdx = getRandomIndex(CHOICES_PER_QUESTION);
      const q = {
        correctId: choices[randIdx].id,
        choices,
      };

      newQuestions.push(q);
    }

    setQuestions(newQuestions);
  };

  const onQuestionFinish = (isCorrect) => {
    if (isCorrect === true) {
      setNumCorrect(numCorrect + 1);
    }

    setRoundNum(roundNum + 1);
  };

  const resetGame = () => {
    setIsLoading(true);
    setQuestions([]);
    setNumCorrect(0);
    setRoundNum(0);
    generateQuestions();
  };

  const selectNewArtist = () => {
    history.push('/');
  };

  return (
    <Container>
      {isLoading && <Loading text="Creating game ..." />}

      { !isLoading && isGameOver && (
        <GameOver
          handleGameReset={resetGame}
          handleNewArtistSelect={selectNewArtist}
          numQuestions={NUM_QUESTIONS}
          numCorrect={numCorrect}
        />
      )}

      { !isLoading && !isGameOver

        && (
        <>
          <h1>Question {roundNum + 1}</h1>
          <div>Artist name here</div>

          <Question
            choices={questions[roundNum].choices}
            onQuestionFinish={onQuestionFinish}
            correctId={questions[roundNum].correctId}
          />
        </>
        )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default GamePage;
