import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import ListItem from './ListItem';

const Search = () => {
  const { history } = useHistory();
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`/api/search/${query}`)
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      })
  }, []);

  const handleButtonClick = (event) => {
    event.preventDefault();
    history.push('/');
  }

  return (
    <div>
      <div>
        {results ?
          (
            results.map((res) => <ListItem id={res.id} images={res.images} name={res.name} />)
          )
          :
          (
            <div>There are no results for your search.</div>
          )
        }
      </div>
      <button onClick={handleButtonClick}>Search again</button>
    </div>
  )
}

export default Search;
