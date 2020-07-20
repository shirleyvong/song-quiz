const config = require('./utils/config');
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const middleware = require('./utils/middleware');
const routes = require('./routes/index');
// const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Only used to get refresh token from Spotify API. Once you have the refresh token,
// add REFRESH_TOKEN to .env and comment this line
// app.use('/', authRoutes);

app.use('/api', routes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
