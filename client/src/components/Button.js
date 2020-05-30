import React from 'react';
import styled from 'styled-components';

const Button = ({ handleClick, text, isVisible = true }) => {
  const Btn = styled.button`
    height: 40px;
    padding: 10px 20px;
    margin: 20px;
    font-family: inherit;
    background-color: white;
    border: none;
    border-radius: 500px;
    font-weight: bold;
    visibility: ${isVisible ? 'visible' : 'hidden'};
    
    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  `;

  return (
    <Btn type="button" onClick={handleClick}>{text}</Btn>
  );
};


export default Button;
