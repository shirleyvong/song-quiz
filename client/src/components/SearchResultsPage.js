import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import SearchResults from './SearchResults';
import Loading from './Loading';


const SearchResultsPage = () => {
  const { history } = useHistory();
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/search/${query}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
        console.log('effect');
      });
  }, []);

  const handleButtonClick = (event) => {
    event.preventDefault();
    history.push('/');
  };

  return (
    <div>
      {isLoading && <Loading />}

      {!isLoading && (
        <>
          <SearchResults results={results} />
          <button type="button" onClick={handleButtonClick}>Search again</button>
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
