import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Loading = ({ text }) => (
  <div>
    <Text>{text}</Text>
  </div>
);

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1
  }

  100% {
    opacity: 0;
  }
`;

const Text = styled.h1`
  animation-duration: 4s;
  animation-name: ${fadeIn};
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
`;

Loading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Loading;
