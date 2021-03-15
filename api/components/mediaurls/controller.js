const Service = require("./service");

exports.getMediaUrl = async (req, res) => {
	try {
		const mediaURL = await Service.getMediaUrl(req.params.id);
		res.json({ mediaURL: mediaURL });
	} catch (err) {
		res.json({ message: err });
	}
};
