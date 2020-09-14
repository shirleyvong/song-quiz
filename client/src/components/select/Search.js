import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { GrSearch } from 'react-icons/gr';

const Search = () => {
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
      <h1>Search artist</h1>
      <Form>
        <Input onChange={handleInputChange} placeholder="Enter an artist..." value={input} />
        <Button type="submit" onClick={handleButtonClick}><GrSearch /></Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  height: 20px;
  width: 100%;
  max-width: 600px;
  padding: 10px 20px;
  border: 0px;
  border-radius: 500px 0 0 500px;
  font-family: inherit;
  letter-spacing: 1px;

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
  border-left: 1px solid #bfbfbf;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export default Search;
