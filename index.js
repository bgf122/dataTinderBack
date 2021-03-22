const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

require("dotenv/config");
const URL = process.env.MONGODB_URI;
const authentication = require("./api/components/authentication")
const programsRoute = require("./api/components/programs/routes");
const suggestionRoute = require("./api/components/suggestions/routes");
const mediaUrlRoute = require("./api/components/mediaurls/routes");
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :postData "
	)
);

morgan.token("postData", function (req, res) {
	return JSON.stringify(req.body);
});

app.use(cors());
app.use(authentication.verify)
app.use("/api/programs", programsRoute);
app.use("/api/suggestions", suggestionRoute);
app.use("/api/mediaurls", mediaUrlRoute);

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
