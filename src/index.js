const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

require("dotenv/config");
const URL = process.env.MONGODB_URI;
const programsRoute = require("./api/components/programs/routes");

app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :postData "
	)
);

morgan.token("postData", function (req, res) {
	return JSON.stringify(req.body);
});

app.use(cors());
app.use("/api/programs", programsRoute);

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
