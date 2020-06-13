import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GrPlay, GrPause } from 'react-icons/gr';

const MusicPlayer = ({ url }) => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const handleButtonClick = () => {
    setIsPlaying(!isPlaying);
  };

  const buttonIcon = isPlaying ? <GrPause /> : <GrPlay />;

  return (
    <Btn onClick={handleButtonClick}>{buttonIcon}</Btn>
  );
};

const Btn = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  margin: 10px;
  font-family: inherit;
  background-color: white;
  border: none;
  border-radius: 50px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

MusicPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default MusicPlayer;
