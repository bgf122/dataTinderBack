const Program = require("../models/program.model");

exports.get_all_programs = (req, res) => {
	Program.find({}).then((programs) => {
		res.json(programs);
	});
};

exports.get_random_program = (req, res) => {
	Program.aggregate([{ $sample: { size: Number(req.params.x) } }]).then((program) => {
		res.json(program);
	});
};
