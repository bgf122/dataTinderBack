const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const morganBody = require("morgan-body");
const app = express();
const cors = require('cors');
const authentication = require("./authentication/authentication");
const { initializeApp } = require('./authentication/initializeApp');

require("dotenv/config");
const URL = process.env.MONGODB_URI;
const programsRoute = require("./routes/programs");
const suggestionsRoute = require("./routes/suggestions");
const mediaUrlsRoute = require("./routes/mediaUrls");
const votesRoute = require("./routes/votes");
const moviesRoute = require("./routes/movies");
const seriesRoute = require("./routes/series");
const userRoute = require("./routes/createUser");
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :postData "
	)
);
morgan.token("postData", function (req, res) {
	return JSON.stringify(req.body);
});

app.use(express.json());
morganBody(app);
initializeApp();
app.use(cors());
app.use("/register", userRoute);
app.use("/api/votes",authentication.verify, votesRoute);
app.use("/api/programs",authentication.verify, programsRoute);
app.use("/api/suggestions", authentication.verify, suggestionsRoute);
app.use("/api/mediaurls", authentication.verify, mediaUrlsRoute);
app.use("/api/movies", authentication.verify, moviesRoute);
app.use("/api/series", authentication.verify, seriesRoute);
app.get("/", (req, res) => {
	res.send("Backend is online.");
});

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
