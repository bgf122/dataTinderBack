const Program = require("../programs/model");

exports.getDistinctGenres = async (req, res) => {
	try {
		const genres = await Program.distinct("subject.title.fi");
		res.json(genres);
	} catch {
		res.json({ message: err});
	}
}