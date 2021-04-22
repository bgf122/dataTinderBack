const Program = require('../models/program');
const User = require('../models/user');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Program.find({ partOfSeries: null });
    res.json(movies);
  } catch (err) {
    res.json({ error: err.message });
  }
};
const getSingleProgram = async (program) => Program.findById(program);
exports.getPopularMovies = async (req, res) => {
  try {
    const userData = await User.aggregate([
      { $unwind: '$data' },
      { $group: { _id: '$data.programId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const programData = async () => Promise.all(userData.map((program) => getSingleProgram(program._id)));

    return programData().then((data) => res.json(data));
  } catch (err) {
    return res.json({ error: err.message });
  }
};
