const Program = require("../programs/model");
const Service = require("./service");

exports.get_mediaUrl = async (req, res) => {
	try {
		const mediaURL = await Service.getMediaUrl(req.params.id);
		res.json({ mediaURL: mediaURL });
	} catch (err) {
		res.json({ message: err });
	}
};
