const config = require('./utils/config');
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const middleware = require('./utils/middleware');
const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/build')));

// Only used to get refresh token from Spotify API.
// const authRoutes = require('./routes/auth');
// app.use('/', authRoutes);

app.use('/api', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
