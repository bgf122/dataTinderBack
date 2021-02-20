const Program = require("../models/program.model");

exports.get_all_programs = (req, res) => {
	Program.find({}).then((programs) => {
		res.json(programs);
	});
};

exports.get_random_program = (req, res) => {
	Program.aggregate([{ $sample: { size: 1 } }]).then((program) => {
		res.json(program);
	});
};
