const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const middleware = require('./utils/middleware');
const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', routes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
