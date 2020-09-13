import React, { useState, useEffect } from 'react';
import useAsyncError from '../../hooks/useAsyncError';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import styled from 'styled-components';

const Image = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
`;

const ArtistContainer = styled.div`
  text-align: center;
  display: flex;
`;

const Container = styled.div`
`

const Artist = styled.a`
  color: white;
  padding: 5px;
  border: 1px solid rgb(255, 255, 255, 0);
  transition: border 0.3s, font-weight 0.3s;

  &:hover {
    border: 1px solid rgb(255, 255, 255, 1);
    ${'' /* text-decoration; */}
  }
`;

const BlankImage = styled.div`
  height: 150px;
  width: 150px;
`;

const RecentArtists = () => {
  const history = useHistory();
  const throwError = useAsyncError();
  const [recentArtists, setRecentArtists] = useState([]);

  const NUM_ARTISTS_DISPLAYED = 5;

  useEffect(() => {
    api.getRecentlyPlayed()
      .then((result) => {
        setRecentArtists(result);
      })
      .catch((error) => {
        throwError('Error fetching recent artists from API');
      });
  }, []);

  const selectArtist = (id) => () => {
    history.push(`/game/${id}`)
  };

  return (
    <Container>
      <h1>Recently played</h1>
      <ArtistContainer>
        {recentArtists
          .slice(0, NUM_ARTISTS_DISPLAYED)
          .map((artist) => (
            <Artist key={artist.id} href={`/game/${artist.id}`} alt={artist.name}>
              {artist.image
                ? <Image src={artist.image} />
                : <BlankImage />
              }
              <div>{artist.name}</div>
            </Artist>
          ))
        }
      </ArtistContainer>
    </Container>
  )
};

export default RecentArtists;
