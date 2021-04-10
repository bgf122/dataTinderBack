const Program = require("../programs/model");

exports.getSuggestions = async (req, res) => {
	try {
		console.log(req.params.amount);
		const suggestions = await Program.aggregate([
			{ $sample: { size: Number(req.params.amount || 1) } }
		]);
		res.json(suggestions);
	} catch (err) {
		res.json({ message: err });
	}
};
