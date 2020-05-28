import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import shuffle from 'knuth-shuffle-seeded';

const Game = () => {
  const CHOICES_PER_QUESTION = 4;
  const NUM_ROUNDS = 5;

  const { id } = useParams();
  
  const [tracks, setTracks] = useState([]);
  const [roundNum, setRoundNum] = useState(0);
  const [questions, setQuestions] = useState([]);

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

  const getRandomNum = (maxNum) => {
    return Math.floor(Math.random() * maxNum) + 1;
  };

  const createQuestions = (tracks) => {
    const copiedTracks = [...tracks];
    shuffle(copiedTracks)

    const questions = [];
    for (let i = 0; i < NUM_ROUNDS; i++) {
      const q = {
        choices: [],
        correctIdx: getRandomNum(CHOICES_PER_QUESTION),
      };

      for (let j = 0; j < CHOICES_PER_QUESTION; j++) {
        const idx = i * CHOICES_PER_QUESTION + j;
        q.choices.push(copiedTracks[idx]);
      }

      questions.push(q);
    }
    
    return questions;
  };

  return (
    <div>
      {JSON.stringify(questions)}
    </div>
  )
}

export default Game;
