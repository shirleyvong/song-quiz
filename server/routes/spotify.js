const router = require('express').Router();
const axios = require('axios');

const baseUrl = 'https://api.spotify.com/v1';

router.get('/search', (req, res) => {
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
    }).catch((error) => {
      console.log(error);
    });
});

module.exports = router;
