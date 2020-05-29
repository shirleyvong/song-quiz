import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SearchResults from './SearchResults';
import Loading from './Loading';

const SearchResultsPage = () => {
  const history = useHistory();
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/search/${query}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      });
  }, []);

  const handleSearchAgain = (event) => {
    event.preventDefault();
    history.push('/');
  };

  const handleResultSelect = (id) => () => {
    history.push(`/game/${id}`);
  };

  return (
    <Container>
      {isLoading && <Loading text="Searching ..." />}

      {!isLoading && (
        <>
          <SearchResults results={results} query={query} handleResultSelect={handleResultSelect} />
          <Button type="button" onClick={handleSearchAgain}>Search again</Button>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  height: 40px;
  padding: 10px 20px;
  margin: 10px;
  font-family: inherit;
  background-color: white;
  border: none;
  border-radius: 500px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export default SearchResultsPage;
