import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaPlay, FaPause } from 'react-icons/fa';

const MusicPlayer = ({ url }) => {
  const [audio, setAudio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);

  const latestUrl = useRef(url);
  const latestAudio = useRef(audio);

  useEffect(() => {
    // Only run this code if the url changes or else we get an infinite loop
    // since we need to keep audio in dependencies
    if (url !== latestUrl.current) {
      // The old audio won't become garbage collected until it's paused, so manually pause
      // before setting new audio element.
      audio.pause();
      setIsPlaying(false);
      setAudio(new Audio(url));
      latestUrl.current = url;
    }
  }, [url, audio]);

  useEffect(() => {
    latestAudio.current = audio;
  }, [audio]);

  useEffect(() => {
    return () => {
      // Can't do audio.pause() because in this effect, audio refers to the first audio element
      // that was created. Must pause the reference for the latest audio element.
      latestAudio.current.pause();
    };
  }, []);

  const handleButtonClick = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const buttonIcon = isPlaying ? <FaPause /> : <FaPlay />;

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
  background-color: rgba(0, 0, 0, 0);
  border: 3px solid white;
  border-radius: 50px;
  font-weight: bold;
  color: white;

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
