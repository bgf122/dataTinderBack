const Program = require('../models/program');

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
