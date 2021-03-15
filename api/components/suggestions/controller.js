const Program = require("../programs/model");

exports.get_one_suggestion = async (req, res) => {
	try {
		const suggestion = await Program.aggregate([
			{ $sample: { size: 1 } },
			{ $project: { _id: 0 } },
		]);
		res.json(suggestion);
	} catch (err) {
		res.json({ message: err });
	}
};

exports.get_multiple_suggestions = async (req, res) => {
	try {
		const suggestions = await Program.aggregate([
			{ $sample: { size: Number(req.params.amount) } },
			{ $project: { _id: 0 } },
		]);
		res.json(suggestions);
	} catch (err) {
		res.json({ message: err });
	}
};
