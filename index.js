const express = require('express');
const mongoose = require('mongoose');
const morganBody = require('morgan-body');

const app = express();
const cors = require('cors');

app.use(cors());
const authentication = require('./authentication/authentication');
const { initializeRecommender, initializeGenreRecommender } = require('./service/recommender');

require('dotenv/config');

const URL = process.env.MONGO;
const programsRoute = require('./routes/programs');
const suggestionsRoute = require('./routes/suggestions');
const votesRoute = require('./routes/votes');
const recommenderRoute = require('./routes/recommendations');
const popularRoute = require('./routes/popular')

app.use(express.json());
morganBody(app);

initializeRecommender().then(() => console.log("suosittelija initialisoitu"))
initializeGenreRecommender().then(() => console.log("genresuosittelija initialisoitu"))
app.use('/api/votes', authentication.verify, votesRoute);
app.use('/api/programs', authentication.verify, programsRoute);
app.use('/api/suggestions', authentication.verify, suggestionsRoute);
app.use('/api/recommendations', authentication.verify, recommenderRoute);
app.use('/api/popular', authentication.verify, popularRoute);

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
