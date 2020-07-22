const spotifyService = require('../services/spotify');

const getAlbumsByIds = async (albumIds) => {
  const MAX_IDS_PER_REQUEST = 20;
  const groupedAlbumIds = [];
  for (let i = 0; i < albumIds.length; i += MAX_IDS_PER_REQUEST) {
    groupedAlbumIds.push(albumIds.splice(i, i + MAX_IDS_PER_REQUEST));
  }

  const promises = groupedAlbumIds.map((group) => spotifyService.getAlbumsByIds(group));
  const results = await Promise.all(promises);

  // Flatten array of data to depth 1
  const albumData = results
    .map((res) => res.albums)
    .reduce((acc, val) => acc.concat(val), []);

  return albumData;
};

const getTracksByAlbums = async (albums) => {
  // Flatten array of data to depth 1
  const tracks = albums
    .map((album) => (
      album.tracks.items.map((item) => ({
        trackName: item.name,
        previewUrl: item.preview_url,
        artists: item.artists.map((artist) => ({ name: artist.name, id: artist.id })),
        albumName: item.name,
        albumImages: item.images,
        id: item.id,
        externalUrl: item.external_urls && item.external_urls.spotify || '',
      }))
    ))
    .reduce((acc, val) => acc.concat(val), [])
    .filter((track, pos, arr) => {
      // Remove tracks with same track name and tracks without preview urls
      return track.previewUrl != null
      && arr.map((obj) => obj.trackName).indexOf(track.trackName) === pos;
    });

  return tracks;
};

const getAlbumIdsByArtist = async (artistId) => {
  const result = await spotifyService.getAlbumIdsByArtist(artistId);
  const albumIds = result.items.map((item) => item.id);
  return albumIds;
};

const getPlayableArtists = async (query) => {
  const searchResults = await spotifyService.searchArtist(query);
  const artists = searchResults.artists.items;

  // An artist needs at least 5 songs with preview urls to be playable
  // No endpoint exists for fetching all tracks, so fetch the top 10 tracks
  // for each artist.
  const trackData = await Promise.all(artists.map((a) => spotifyService.getArtistTopTracks(a.id)));
  const numTracksByArtist = {};
  trackData.forEach((item) => {
    item.tracks = item.tracks.filter((track) => !!track.preview_url);
    numTracksByArtist[item.artistId] = item.tracks.length;
  });

  // NUM_QUESTIONS in game.js on client-side must be less or equal to MIN_TRACKS
  const MIN_TRACKS = 5;

  const playableArtists = artists
    .filter((artist) => numTracksByArtist[artist.id] >= MIN_TRACKS)
    .map((artist) => ({
      id: artist.id,
      images: artist.images,
      name: artist.name,
    }));

  return playableArtists;
};

module.exports = {
  getAlbumIdsByArtist,
  getAlbumsByIds,
  getTracksByAlbums,
  getPlayableArtists,
};
