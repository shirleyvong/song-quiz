import React from 'react';
import styled from 'styled-components';

const Button = ({ handleClick, text, isVisible = true }) => {
  return (
    <Btn type="button" onClick={handleClick} visible={isVisible}>{text}</Btn>
  );
};

const Btn = styled.button`
  height: 40px;
  padding: 10px 20px;
  margin: 10px;
  font-family: inherit;
  background-color: white;
  border: none;
  border-radius: 500px;
  font-weight: bold;
  visibility: ${(props) => props.visible ? 'visible' : 'hidden' };

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;


export default Button;
