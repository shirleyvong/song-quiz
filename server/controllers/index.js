const helpers = require('./helpers');

const searchArtist = async (req, res) => {
  const { q: query } = req.params;

  try {
    const accessToken = req.app.locals.accessToken.value;
    const artists = await helpers.getPlayableArtists(query, accessToken);
    res.json(artists);
  } catch (error) {
    console.error(error);
  }
};

const getTracksByArtist = async (req, res) => {
  const { id } = req.params;

  try {
    const accessToken = req.app.locals.accessToken.value;

    /**
     * Spotify API doesn't have an endpoint for retrieving an artist's
     * tracks, so we need to chain multiple requests.
     *  1) Get the album ids by artist
     *  2) Get the album by album id, which contains track info
     */
    const albumIds = await helpers.getAlbumIdsByArtist(id, accessToken);
    const albums = await helpers.getAlbumsByIds(albumIds, accessToken);
    let tracks = await helpers.getTracksByAlbums(albums);
    tracks = helpers.removeUnplayableTracks(tracks);

    res.json(tracks);
  } catch (error) {
    console.error(error);
  }
};

const addRecentlyPlayed = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new Error('Request body must contain id');
  }

  const { redis } = req.app.locals;
  redis.zadd('recently-played', Date.now(), id, (addError, addResponse) => {
    if (addError) throw addError;

    redis.zremrangebyrank('recently-played', 0, -11);

    res.json({ id });
  });
};

const getRecentlyPlayed = async (req, res) => {
  const { redis } = req.app.locals;
  redis.zrange('recently-played', 0, 9, async (rangeError, rangeResponse) => {
    if (rangeError) throw rangeError;

    const accessToken = req.app.locals.accessToken.value;
    const data = await helpers.getArtistNames(rangeResponse, accessToken);

    res.json(data);
  });
};

module.exports = {
  searchArtist,
  getTracksByArtist,
  addRecentlyPlayed,
  getRecentlyPlayed,
};
