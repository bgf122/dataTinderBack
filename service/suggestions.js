const Program = require("../models/programs");

exports.getSuggestions = async (req, res) => {
	try {
		const suggestions = await Program.aggregate([
			{ $sample: { size: Number(req.params.amount || 1) } }
		]);
		res.json(suggestions);
	} catch (err) {
		res.json({ message: err });
	}
};
