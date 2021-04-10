const Program = require("../models/programs");

exports.getDistinctGenres = async (req, res) => {
	try {
		const genres = await Program.distinct("partOfSeries.title.fi");
		res.json(genres);
	} catch {
		res.json({ message: err});
	}
}