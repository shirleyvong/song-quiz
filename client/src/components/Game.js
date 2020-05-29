import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import shuffle from 'knuth-shuffle-seeded';
import Question from './Question';

const Game = () => {
  const CHOICES_PER_QUESTION = 4;
  const NUM_ROUNDS = 5;

  const { id } = useParams();

  const [tracks, setTracks] = useState([]);
  const [roundNum, setRoundNum] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [numCorrect, setNumCorrect] = useState(0);

  useEffect(() => {
    axios.get(`/api/tracks/${id}`)
      .then((res) => {
        setTracks(res.data);
      });
  }, []); 
    
  useEffect(() =>{
    if (tracks && tracks.length > 0) {
      const questions = createQuestions(tracks);
      setQuestions(questions);
    }
  }, [tracks]);

  const getRandomIndex = (maxNum) => {
    return Math.floor(Math.random() * maxNum - 1) + 1;
  };

  const createQuestions = (tracks) => {
    const copiedTracks = [...tracks];
    shuffle(copiedTracks)

    const questions = [];
    for (let i = 0; i < NUM_ROUNDS; i++) {
      const choices = []
      for (let j = 0; j < CHOICES_PER_QUESTION; j++) {
        const idx = i * CHOICES_PER_QUESTION + j;
        choices.push(copiedTracks[idx]);
      }
      
      const randIdx = getRandomIndex(CHOICES_PER_QUESTION);
      const q = {
        correct: choices[randIdx].id,
        choices,
      }

      questions.push(q);
    }
    
    return questions;
  };

  const onQuestionFinish = (isCorrect) => {
    if (isCorrect === true) {
      setNumCorrect(numCorrect + 1);
    }

    setRoundNum(roundNum + 1);
  }

  return (
    <div>
      { questions && questions.length > 0 ?
        <>
          <div>Question {roundNum + 1}</div>
          <div>Artist name here</div>
          <div>Correct so far: {numCorrect}</div>

          <Question
            choices={questions[roundNum].choices}
            onQuestionFinish={onQuestionFinish}
            correct={questions[roundNum].correct}
          />
          
        </>
        :
        <div>Please wait while we create your game...</div>
      }
    </div>
  )
}

export default Game;
