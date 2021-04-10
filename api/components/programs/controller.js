const Program = require("./model");

exports.getAllPrograms = async (req, res) => {
	try {
		const programs = await Program.find();
		res.json(programs);
	} catch (err) {
		res.json({ message: err });
	}
};

exports.getProgram = async (req, res) => {
	try {
		const program = await Program.find({ id: req.params.id });
		res.json(program);
	} catch (err) {
		res.json({ message: err });
	}
};

exports.getDistinctGenres = async (req, res) => {
	try {
		const genres = await Program.distinct("subject.title.fi");
		res.json(genres);
	} catch {
		res.json({ message: err});
	}
}
