const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const morganBody = require("morgan-body");
const app = express();
const cors = require('cors');

require("dotenv/config");
const URL = process.env.MONGODB_URI;
const authentication = require("./authentication/authentication");
const programsRoute = require("./routes/programs");
const suggestionsRoute = require("./routes/suggestions");
const mediaUrlsRoute = require("./routes/mediaUrls");
const preferencesRoute = require("./routes/preferences");
const genresRoute = require("./routes/genres");
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
app.use(cors());
app.use(authentication.verify)
app.use("/api/preferences", preferencesRoute);
app.use("/api/programs", programsRoute);
app.use("/api/suggestions", suggestionsRoute);
app.use("/api/mediaurls", mediaUrlsRoute);
app.use("/api/genres", genresRoute);

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
