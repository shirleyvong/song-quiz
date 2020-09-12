const axios = require('axios');
const queryString = require('query-string');
const config = require('../utils/config');

const baseUrl = 'https://api.spotify.com/v1';

const searchArtist = async (query, accessToken) => {
  const { data } = await axios.get(`${baseUrl}/search`,
    {
      params: {
        type: 'artist',
        q: query,
        limit: 20,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return data;
};

const getAlbumsByIds = async (ids, accessToken) => {
  const formattedIds = JSON.stringify(ids).replace(/\[|\]|"/g, '');

  const { data } = await axios.get(`${baseUrl}/albums`,
    {
      params: {
        include_groups: 'album,single',
        ids: formattedIds,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return data;
};

const getAlbumIdsByArtist = async (artistId, accessToken) => {
  const MAX_RETURNED_ALBUMS = 50;

  const { data } = await axios.get(`${baseUrl}/artists/${artistId}/albums`,
    {
      params: {
        include_groups: 'album,single',
        limit: MAX_RETURNED_ALBUMS,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return data;
};

const getArtistTopTracks = async (artistId, accessToken) => {
  const { data } = await axios.get(`${baseUrl}/artists/${artistId}/top-tracks`,
    {
      params: {
        country: 'CA',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return {
    artistId,
    tracks: data.tracks,
  };
};

const getAccessToken = async () => {
  const encodedAuth = Buffer.from(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`)
    .toString('base64');

  const { data } = await axios.post('https://accounts.spotify.com/api/token',
    queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token: config.REFRESH_TOKEN,
    }),
    {
      headers: {
        Authorization: `Basic ${encodedAuth}`,
      },
    });

  return {
    accessToken: data.access_token,
    expires: Date.now() + data.expires_in * 1000, // convert to milliseconds
  };
};

module.exports = {
  searchArtist,
  getAlbumsByIds,
  getAlbumIdsByArtist,
  getArtistTopTracks,
  getAccessToken,
};
