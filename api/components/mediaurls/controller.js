const Program = require("../programs/model");
const Service = require("./service");

exports.get_mediaUrl = async (req, res) => {
	try {
		const mediaUrl = await Service.getMediaUrl(req.params.id);
		res.json(mediaUrl);
	} catch (err) {
		res.json({ message: err });
	}
};
