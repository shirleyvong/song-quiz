const config = require('./config');
const axios = require('axios');
const querystring = require('querystring');

let accessToken;
let accessTokenExpiry;

const setAccessToken = async (req, res, next) => {
  const getNewAccessToken = () => {
    const encodedAuth = Buffer.from(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`).toString('base64');

    return axios.post('https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: config.REFRESH_TOKEN,
      }),
      {
        headers: {
          Authorization: `Basic ${encodedAuth}`,
        },
      })
      .then((response) => {
        accessToken = response.data.access_token;
        accessTokenExpiry = Date.now() + response.data.expires_in * 1000; // milliseconds
        return { accessToken, accessTokenExpiry };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!accessToken || Date.now() > accessTokenExpiry) {
    ({ accessToken, accessTokenExpiry } = await getNewAccessToken());
  }

  req.accessToken = accessToken;
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  next(err);
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  setAccessToken,
};
