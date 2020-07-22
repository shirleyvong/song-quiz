const helpers = require('./helpers');

const searchArtist = async (req, res) => {
  const { q } = req.params;

  try {
    const artists = await helpers.getPlayableArtists(q);
    res.json(artists);
  } catch (error) {
    console.log(error);
  }
};

const getTracksByArtist = async (req, res) => {
  const { id } = req.params;

  try {
    /**
     * Spotify API doesn't have an endpoint for retrieving an artist's
     * tracks, so we need to chain multiple requests.
     *  1) Get the album ids by artist
     *  2) Get the album by album id, which contains track info
     */
    const albumIds = await helpers.getAlbumIdsByArtist(id, req.accessToken);
    const albums = await helpers.getAlbumsByIds(albumIds, req.accessToken);
    const tracks = await helpers.getTracksByAlbums(albums);

    res.json(tracks);
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  searchArtist,
  getTracksByArtist,
};
