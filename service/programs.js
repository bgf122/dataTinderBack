const Program = require('../models/program');
const User = require('../models/user');

const getSingleProgram = async (program) => Program.findById(program);

exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getProgram = async (req, res) => {
  try {
    const program = await Program.find({ id: req.params.id });
    res.json(program);
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getPopularPrograms = async (req, res) => {
  console.log('get popular');
  try {
    const userData = await User.aggregate([
      { $unwind: '$data' },
      { $match: { 'data.value': 1 } },
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
