import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ handleClick, text, isVisible = true }) => {
  return (
    <Btn type="button" onClick={handleClick} visible={isVisible}>{text}</Btn>
  );
};

const Btn = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-family: inherit;
  background-color: rgba(0, 0, 0, 0);
  border: 3px solid white;
  color: white;
  border-radius: 500px;
  visibility: ${(props) => props.visible ? 'visible' : 'hidden' };
  text-transform: uppercase;
  
  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
};

Button.defaultProps = {
  isVisible: false,
};

export default Button;
