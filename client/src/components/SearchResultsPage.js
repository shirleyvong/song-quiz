import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import SearchResults from './SearchResults';
import Loading from './Loading';
import styled from 'styled-components';

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

  const handleButtonClick = (event) => {
    event.preventDefault();
    history.push('/');
  };

  return (
    <Container>
      {isLoading && <Loading />}

      {!isLoading && (
        <>
          <SearchResults results={results} query={query} />
          <Button type="button" onClick={handleButtonClick}>Search again</Button>
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
  
  &:focus {
    outline: none;
  }  
`;

export default SearchResultsPage;
