const Program = require('../models/program');

exports.getAllSeries = async (req, res) => {
  try {
    const series = await Program.find({ partOfSeries: { $exists: true } });
    res.json(series);
  } catch (err) {
    res.json({ message: err });
  }
};
