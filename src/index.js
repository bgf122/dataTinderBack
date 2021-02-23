const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');
const URL = process.env.MONGODB_URI;

const programsRoute = require('./api/components/programs/routes');

app.use('/api/programs', programsRoute);

mongoose
	.connect(URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `App running on port ${PORT}`);