const Program = require("../models/programs");

exports.getAllMovies = async (req, res) => {
	try {
		const movies = await Program.find({"partOfSeries" : null});
		res.json(movies);
	} catch (err) {
		res.json({ message: err });
	}
};