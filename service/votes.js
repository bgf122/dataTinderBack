const User = require('../models/user');
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
    const data = await User.find({ _id: req.body._id });
    res.json(data);
  } catch (err) {
    res.json({ error: err.message });
  }
};
