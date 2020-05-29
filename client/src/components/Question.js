import React, { useState, useEffect } from 'react';

const Question = ({ choices, correct, onQuestionFinish }) => {
  const [isAnswerCorrect, setAnswerCorrect] = useState();

  useEffect(() => {
    setAnswerCorrect();
  }, [choices])

  const handleAnswerSelect = (trackId) => (event) => {
    if (trackId === correct) {
      setAnswerCorrect(true);
    } else {
      setAnswerCorrect(false);
    }
  };

  const handleNextButtonClick = () => {
    console.log(isAnswerCorrect);
    onQuestionFinish(isAnswerCorrect);
  }

  return (
    <div>
    
      <button>Play song</button>

      {
        choices.map((choice) => <button key={choice.id} onClick={handleAnswerSelect(choice.id)}>
          {choice.trackName}
        </button>)
      }

      {isAnswerCorrect === true && 'Correct!' || isAnswerCorrect === false && 'Incorrect'}

      {isAnswerCorrect != null &&
        <button onClick={handleNextButtonClick}>Next round</button>
      }
    </div>
  )
};

export default Question;
