const Program = require('../models/program');
const User = require('../models/user');

exports.getSuggestions = async (req, res) => {
  try {
    const swiped = await User.aggregate([
      { $match: { _id: res.locals.uid } },
      { $unwind: '$data' },
      { $group: { _id: '$data.programId' } },
    ]);

    const Ids = swiped.map((show) => show._id);

    const random = await Program.aggregate([
      { $match: { _id: { $nin: Ids } } },
      { $sample: { size: 1 } },
    ]);

    return await res.json(random.map((random) => ({ ...random, suggestionType: 'random' })));
  } catch (err) {
    return res.json({ error: err.message });
  }
};
