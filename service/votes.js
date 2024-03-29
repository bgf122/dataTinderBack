const User = require('../models/user');
const Program = require('../models/program');
const Service = require('./recommender');

exports.saveUserData = async (req, res) => {
  try {
    const newItem = await User.updateOne(
      {
        _id: res.locals.uid,
      },
      {
        $push: {
          data: {
            programId: req.body.programId,
            type: req.body.type,
            value: req.body.value,
          },
        },
      }, { upsert: true },
    );
    if (req.body.value === 1) {
      Service.addLikeForUser(res.locals.uid, req.body.programId);
    } else if (req.body.value === -1) {
      Service.addDislikeForUser(res.locals.uid, req.body.programId);
    }

    res.json({ savedVote: newItem });
  } catch (err) {
    res.json({ error: err.message });
  }
};


exports.getUserData = async (req, res) => {
  
try {
    const data = await User.aggregate([
      { $unwind: '$data' },
      { $match: { 'data.value': 1, _id: res.locals.uid } },
      { $group: { _id: '$data.programId' } }


    ]);
    const ids = await data.map(like => like._id)


    const likedPrograms = await Program.find({
      '_id': {
        $in: ids

      }
    });

    res.json(likedPrograms);
  } catch (err) {
    res.json({ error: err.message });
  }
};

