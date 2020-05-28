import React, { useState }from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
  const history = useHistory();
  
  const [input, setInput] = useState('');
  
  const handleInputChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    console.log(input);
    history.push(`/search/${input}`);
  }
  
  return (
    <div>
      <form>
        <input onChange={handleInputChange} placeholder="Enter an artist..." value={input} />
        <button type="submit" onClick={handleButtonClick}>Search</button>
      </form>
    </div>
  )
}

export default SearchBar;
