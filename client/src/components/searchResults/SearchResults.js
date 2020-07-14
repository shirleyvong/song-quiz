import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api';
import List from './List';
import Loading from '../generic/Loading';
import Button from '../generic/Button';
import useAsyncError from '../../hooks/useAsyncError';

const SearchResults = () => {
  const history = useHistory();
  const { query } = useParams();
  const throwError = useAsyncError();

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.search(query)
      .then((data) => {
        setResults(data);
        setIsLoading(false);
      })
      .catch((error) => {
        throwError('Error fetching search from API');
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
      { isLoading
        ? <Loading text="searching ..." />
        : (
          <>
            <h1>search results for "{query}"</h1>
            <ListContainer>
              {results && results.length > 0
                ? <List items={results} handleItemSelect={handleResultSelect} />
                : <h1>There are no results.</h1>}
            </ListContainer>
            <Button handleClick={handleSearchAgain} text="search again" />
          </>
        )}
    </Container>
  );
};

const ListContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 60vh;
  overflow: auto;
  padding-right: 20px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default SearchResults;
