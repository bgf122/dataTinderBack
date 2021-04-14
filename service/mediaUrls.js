const Service = require('./decryptMediaUrl');

exports.getMediaUrl = async (req, res) => {
  try {
    const mediaURL = await Service.getMediaUrl(req.params.id);
    res.json({ mediaURL });
  } catch (err) {
    res.json({ message: err.message });
  }
};
