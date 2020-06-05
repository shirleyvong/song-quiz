import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SearchResults from './SearchResults';
import Loading from '../generic/Loading';
import Button from '../generic/Button';

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
          <Button handleClick={handleSearchAgain} text="Search again" />
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

export default SearchResultsPage;
