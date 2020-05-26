require('dotenv').config();

const {
  CLIENT_ID, CLIENT_SECRET, PORT, REFRESH_TOKEN,
} = process.env;

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  PORT,
  REFRESH_TOKEN,
};
