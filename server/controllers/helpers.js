const spotifyAPI = require('../services/spotifyAPI');

const partition = (array, numPartitions) => {
  const partitionedArray = []
  for (let i = 0; i < array.length; i += numPartitions) {
    partitionedArray.push(array.splice(i, i + numPartitions));
  }

  return partitionedArray;
};

const flatten = (array) => {
  return array.reduce((acc, val) => acc.concat(val), []);
}

const getAlbumsByIds = async (albumIds, accessToken) => {
  const MAX_IDS_PER_REQUEST = 20;
  const partitionedAlbumIds = partition(albumIds, MAX_IDS_PER_REQUEST);

  const promises = partitionedAlbumIds.map((group) => (
    spotifyAPI.getAlbumsByIds(group, accessToken))
  );
  const results = await Promise.all(promises);

  const albumData = results.map((res) => res.albums)

  return flatten(albumData);
};

const removeUnplayableTracks = (tracks) => {
  // Remove tracks with same track name and tracks without preview urls
  return tracks.filter((track, pos, arr) => (
    track.previewUrl
    && arr.map((obj) => obj.trackName).indexOf(track.trackName) === pos
  ));
}

const getTracksByAlbums = async (albums) => {
  let tracks = albums
    .map((album) => (
      album.tracks.items.map((item) => ({
        trackName: item.name,
        previewUrl: item.preview_url,
        artists: item.artists.map((artist) => ({
          name: artist.name,
          id: artist.id,
        })),
        albumName: item.name,
        albumImages: item.images,
        id: item.id,
        externalUrl: item.external_urls && item.external_urls.spotify || '',
      }))
    ))

  tracks = flatten(tracks);
  tracks = removeUnplayableTracks(tracks);

  return tracks;
};

const getAlbumIdsByArtist = async (artistId, accessToken) => {
  const result = await spotifyAPI.getAlbumIdsByArtist(artistId, accessToken);
  const albumIds = result.items.map((item) => item.id);
  return albumIds;
};

const getNumTracksByArtists = (trackData) => {
  const numTracksByArtist = {};
  trackData.forEach((item) => {
    item.tracks = item.tracks.filter((track) => !!track.preview_url);
    numTracksByArtist[item.artistId] = item.tracks.length;
  });

  return numTracksByArtist;
};

const getPlayableArtists = async (query, accessToken) => {
  const searchResults = await spotifyAPI.searchArtist(query, accessToken);
  const artists = searchResults.artists.items;

  // An artist needs at least 5 songs with preview urls to be playable
  // No endpoint exists for fetching all tracks, so fetch the top 10 tracks
  // for each artist
  const trackData = await Promise.all(artists.map((a) => (
    spotifyAPI.getArtistTopTracks(a.id, accessToken)))
  );
  const numTracksByArtists = getNumTracksByArtists(trackData);

  // NUM_QUESTIONS in game.js on client-side must be less or equal to MIN_TRACKS
  const MIN_TRACKS = 5;

  const playableArtists = artists
    .filter((artist) => numTracksByArtists[artist.id] >= MIN_TRACKS)
    .map((artist) => ({
      id: artist.id,
      images: artist.images,
      name: artist.name,
    }));

  return playableArtists;
};

const getArtistNames = async (ids, accessToken) => {
  const result = await spotifyAPI.getSeveralArtists(ids, accessToken);
  const artists = result.artists.reduce((obj, item) => ({ ...obj, [item.id]: item.name }), {});
  return artists;
};

module.exports = {
  getAlbumIdsByArtist,
  getAlbumsByIds,
  getTracksByAlbums,
  getPlayableArtists,
  getArtistNames,
  removeUnplayableTracks,
};
