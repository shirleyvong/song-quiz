const spotifyAPI = require('../services/spotify');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  next(err);
};

const updateAccessToken = async (req, res, next) => {
  const accessTokenData = req.app.locals.accessToken;
  const isTokenExpired = !accessTokenData || !accessTokenData.value || Date.now() >= accessTokenData.expires;
  if (!isTokenExpired) {
    next();
  }

  try {
    const { accessToken, expires } = await spotifyAPI.getAccessToken();
    req.app.locals.accessToken = {
      value: accessToken,
      expires,
    };

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  updateAccessToken,
};
