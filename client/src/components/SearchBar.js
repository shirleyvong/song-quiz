import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { GrSearch } from 'react-icons/gr';

const SearchBar = () => {
  const history = useHistory();

  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    history.push(`/search/${input}`);
  };

  return (
    <Container>
      <Form>
        <Input onChange={handleInputChange} placeholder="Enter an artist..." value={input} />
        <Button type="submit" onClick={handleButtonClick}><GrSearch /></Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  height: 20px;
  width: 100%;
  padding: 10px 20px;
  border: 0px;
  border-radius: 500px 0 0 500px;
  font-family: inherit;

  &:focus {
    outline: none;
  }  
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 500px 500px 0;
  height: 40px;
  width: 40px;
  padding: 0px;
  border: none;
  background-color: white;
  border-left: 1px solid black;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export default SearchBar;
