const spotifyAPI = require('../services/spotifyAPI');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  next(err);
};

const updateAccessToken = async (req, res, next) => {
  const accessTokenData = req.app.locals.accessToken;

  if (
    accessTokenData
    && accessTokenData.value
    && Date.now() < accessTokenData.expires
  ) {
    next();
    return;
  }

  try {
    const { accessToken, expires } = await spotifyAPI.getAccessToken();
    req.app.locals.accessToken = {
      value: accessToken,
      expires,
    };

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  updateAccessToken,
};
