const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const routes = require("./api/routes/");
const app = express();

require("dotenv").config();

const url = process.env.MONGODB_URI;
app.use(express.json());

// Määrittelee logituksen muodon
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :requestData "
	)
);

// Logituksen tulostus
morgan.token("requestData", function (req, res) {
	return JSON.stringify(req.body);
});

// Rajapinnan juuri
app.use("/", routes)

mongoose
	.connect(url, {
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
