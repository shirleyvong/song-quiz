const config = require('../utils/config');

const express = require('express');
const axios = require('axios');
const queryString = require('query-string');

const router = express.Router();

const REDIRECT_URI = `http://localhost:${config.PORT}/callback`;

let accessToken = '';
let refreshToken = '';

router.get('/auth', (req, res) => {
  const query = queryString.stringify(
    {
      response_type: 'code',
      client_id: config.CLIENT_ID,
      redirect_uri: REDIRECT_URI,
    },
  );

  res.redirect(`https://accounts.spotify.com/authorize?${query}`);
});

router.get('/callback', (req, res) => {
  // Exchange authorization code for access token
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: queryString.stringify({
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      client_secret: config.CLIENT_SECRET,
      client_id: config.CLIENT_ID,
    }),
  }).then((response) => {
    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
    res.json({ accessToken, refreshToken });
  }).catch((err) => {
    console.log('an error occured in callback');
  });
});

module.exports = router;
