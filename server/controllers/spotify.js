const axios = require('axios');
const helpers = require('./helpers');

const baseUrl = 'https://api.spotify.com/v1';

const searchArtist = (req, res) => {
  const { q } = req.query;

  axios.get(`${baseUrl}/search`,
    {
      params: {
        type: 'artist',
        q,
      },
      headers: {
        Authorization: `Bearer ${req.accessToken}`,
      },
    })
    .then(({ data }) => {
      const result = data.artists.items.map((item) => ({
        id: item.id,
        images: item.images,
        name: item.name,
      }));

      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getTracksByArtist = async (req, res) => {
  const { id } = req.query;

  try {
    /**
     * Spotify API doesn't have an endpoint for retrieving an artist's
     * tracks, so we need to chain multiple requests.
     *  1) Get the album ids by artist
     *  2) Get the album by album id, which contains track info
     */
    const albumIds = await helpers.getAlbumIdsFromArtist(id, req.accessToken);
    const albums = await helpers.getAlbumsFromIds(albumIds, req.accessToken);
    const tracks = await helpers.getTracksFromAlbums(albums);

    res.json(tracks);
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  searchArtist,
  getTracksByArtist,
};
