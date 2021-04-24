const express = require('express');
const mongoose = require('mongoose');
const morganBody = require('morgan-body');

const app = express();
const cors = require('cors');

app.use(cors());
const authentication = require('./authentication/authentication');
const { initializeRecommender } = require('./service/recommender');

require('dotenv/config');

const URL = process.env.TEST_MONGO;
const programsRoute = require('./routes/programs');
const suggestionsRoute = require('./routes/suggestions');
const votesRoute = require('./routes/votes');
const moviesRoute = require('./routes/movies');
const seriesRoute = require('./routes/series');
const recommenderRoute = require('./routes/recommendations');

app.use(express.json());
morganBody(app);
initializeRecommender();

app.use('/api/votes', authentication.verify, votesRoute);
app.use('/api/programs', authentication.verify, programsRoute);
app.use('/api/suggestions', authentication.verify, suggestionsRoute);
app.use('/api/movies', authentication.verify, moviesRoute);
app.use('/api/series', authentication.verify, seriesRoute);
app.use('/api/recommendations', authentication.verify, recommenderRoute);
app.get('/', (req, res) => {
  res.send('Backend is online.');
});

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `App running on port ${PORT}`);
