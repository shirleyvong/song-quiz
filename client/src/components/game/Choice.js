import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Choice = ({
  id, handleAnswerSelect, trackName, isCorrect, isSelected, isDisabled = false,
}) => {
  const [backgroundColour, setBackgroundColour] = useState('#333333');

  useEffect(() => {
    if (isCorrect) {
      setBackgroundColour('green');
    } else if (isSelected) {
      setBackgroundColour('red');
    }
  }, [isSelected, isCorrect]);

  const handleBtnClick = () => {
    handleAnswerSelect(id);
  };

  return (
    <Button onClick={handleBtnClick} disabled={isDisabled} backgroundColour={backgroundColour}>
      {trackName}
    </Button>
  );
};

const Button = styled.button`
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.disabled && props.backgroundColour ? props.backgroundColour : '#333333')};
  min-width: 300px;
  margin: 5px;
  padding: 10px;
  width: 100%;
  border-radius: 20px;
  border: none;
  font-family: inherit;
  color: inherit;
  font-size: 1.2rem;


  ${(props) => !props.disabled && css`
    &:hover {
      font-weight: bold;
      background-color: #575757;
      transition: font-weight 0.2s;
      transition: background-color 0.2s;
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  `}
`;

export default Choice;
