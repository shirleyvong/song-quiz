const axios = require('axios');

const baseUrl = 'https://api.spotify.com/v1';

const getAlbumsFromIds = async (albumIds, accessToken) => {
  // Spotify allows up to 20 albums to fetched with a single
  // request, so make several requests if needed
  const groupedAlbumIds = [];
  for (let i = 0; i < albumIds.length; i += 20) {
    groupedAlbumIds.push(albumIds.splice(i, i + 20));
  }

  // Format ids for use in query param
  const getFormattedIds = (group) => JSON.stringify(group).replace(/\[|\]|"/g, '');

  const requests = groupedAlbumIds.map((group) => (
    axios.get(`${baseUrl}/albums`, {
      params: {
        include_groups: 'album,single',
        ids: getFormattedIds(group),
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ));

  const results = await Promise.all(requests);
  let albumData = results.map((res) => res.data.albums);

  // Flatten array to depth 1
  albumData = albumData.reduce((acc, val) => acc.concat(val), []);
  return albumData;
};

const getTracksFromAlbums = async (albums) => {
  let tracks = albums.map((album) => (
    album.tracks.items.map((item) => ({
      trackName: item.name,
      previewUrl: item.preview_url,
      artists: item.artists.map((artist) => ({ name: artist.name, id: artist.id })),
      albumName: item.name,
      albumImages: item.images,
    }))
  ));

  // Flatten array to depth 1
  tracks = tracks.reduce((acc, val) => acc.concat(val), []);
  return tracks;
};

const getAlbumIdsFromArtist = async (artistId, accessToken) => {
  const { data: albumData } = await axios.get(`${baseUrl}/artists/${artistId}/albums`, {
    params: {
      include_groups: 'album,single',
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const albumIds = albumData.items.map((item) => item.id);
  return albumIds;
};

module.exports = {
  getAlbumIdsFromArtist,
  getAlbumsFromIds,
  getTracksFromAlbums,
};
