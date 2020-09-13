const redis = require('redis');
const config = require('./utils/config');
const helpers = require('./controllers/helpers');

const redisClient = redis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD,
});

redisClient.on('error', (error) => {
  console.error(error);
});

redisClient.on('connect', () => {
  console.log('Successfully connected to Redis');
});

const addRecentlyPlayed = (id) => {
  return new Promise((resolve, reject) => {
    redisClient.zadd('recently-played', Date.now(), id, (addError, addResponse) => {
      if (addError) reject(addError);
      redisClient.zremrangebyrank('recently-played', 0, -11);
      resolve(id);
    });
  });
};

const getRecentlyPlayed = (accessToken) => {
  return new Promise((resolve, reject) => {
    redisClient.zrevrange('recently-played', 0, 9, (rangeError, rangeResponse) => {
      if (rangeError) reject(rangeError);
      helpers.getArtistNames(rangeResponse, accessToken)
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  });
};

module.exports = {
  addRecentlyPlayed,
  getRecentlyPlayed,
};
