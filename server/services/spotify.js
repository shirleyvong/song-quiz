const config = require('../utils/config');
const axios = require('axios');
const querystring = require('querystring');

const baseUrl = 'https://api.spotify.com/v1';

let accessToken;
let accessTokenExpiry;

const setAccessToken = async () => {
  if (accessToken && Date.now() > accessTokenExpiry) {
    console.log('Access token expiry', accessTokenExpiry);
    console.log('Now:', Date.now());

    return;
  }

  const encodedAuth = Buffer.from(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`).toString('base64');

  try {
    const { data } = await axios.post('https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: config.REFRESH_TOKEN,
      }),
      {
        headers: {
          Authorization: `Basic ${encodedAuth}`,
        },
      });

    accessToken = data.access_token;
    accessTokenExpiry = Date.now() + data.expires_in * 1000; // convert to milliseconds
  } catch (error) {
    console.log(error);
  }
};

const searchArtist = async (query) => {
  await setAccessToken();

  const { data } = await axios.get(`${baseUrl}/search`,
    {
      params: {
        type: 'artist',
        q: query,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return data;
};

const getAlbumsByIds = async (ids) => {
  await setAccessToken();

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

const getAlbumIdsByArtist = async (artistId) => {
  await setAccessToken();

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

module.exports = {
  searchArtist,
  getAlbumsByIds,
  getAlbumIdsByArtist,
};
