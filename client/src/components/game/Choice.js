import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Choice = ({
  id, handleAnswerSelect, trackName, isCorrect, isSelected, isDisabled = false,
}) => {
  const [backgroundColour, setBackgroundColour] = useState('#333333');

  useEffect(() => {
    if (isCorrect) {
      setBackgroundColour('#5db356');
    } else if (isSelected) {
      setBackgroundColour('#ff4a4a');
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
  background-color: ${(props) => (
    props.disabled && props.backgroundColour
      ? props.backgroundColour
      : '#333333'
  )}; 
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

Choice.propTypes = {
  id: PropTypes.string.isRequired,
  handleAnswerSelect: PropTypes.func.isRequired,
  trackName: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default Choice;
