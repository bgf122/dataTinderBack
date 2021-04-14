const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const morganBody = require('morgan-body');

const app = express();
const cors = require('cors');
const authentication = require('./authentication/authentication');
const { initializeApp } = require('./authentication/initializeApp');
const { initializeKmeans } = require('./service/kmeans');

require('dotenv/config');

const URL = process.env.MONGODB_URI;
const programsRoute = require('./routes/programs');
const suggestionsRoute = require('./routes/suggestions');
const votesRoute = require('./routes/votes');
const moviesRoute = require('./routes/movies');
const seriesRoute = require('./routes/series');
const userRoute = require('./routes/createUser');
const kmeansRoute = require('./routes/kmeans');

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postData ',
  ),
);
morgan.token('postData', (req) => JSON.stringify(req.body));

app.use(express.json());
morganBody(app);
initializeApp();
initializeKmeans();
app.use(cors());
app.use('/register', userRoute);
app.use('/api/votes', authentication.verify, votesRoute);
app.use('/api/programs', authentication.verify, programsRoute);
app.use('/api/suggestions', authentication.verify, suggestionsRoute);
app.use('/api/movies', authentication.verify, moviesRoute);
app.use('/api/series', authentication.verify, seriesRoute);
app.use('/api/kmeans', authentication.verify, kmeansRoute);
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
