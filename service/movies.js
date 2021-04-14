const Program = require('../models/program');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Program.find({ partOfSeries: null });
    res.json(movies);
  } catch (err) {
    res.json({ error: err.message });
  }
};
