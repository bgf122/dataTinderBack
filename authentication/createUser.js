const admin = require('firebase-admin');
const Service = require('../service/kmeans');
const User = require('../models/user')

const requestBodyValid = (body) => {
  if (body.email && body.firstName && body.lastName && body.password) {
    return true
  }
  return false
}

exports.createUser = async (req, res) => {
  if (!requestBodyValid(req.body)) {
    res.status(400).json({ error: 'missing required fields' })
  } else {
    try {
      await admin.auth()
        .createUser({
          uid: req.body.email,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          displayName: `${req.body.firstName} ${req.body.lastName}`,
          password: req.body.password,
          disabled: false,
        });
      Service.addNewUser(req.body.email);

      await User.updateOne(
        {
          _id: req.body.email,
          displayName: `${req.body.firstName} ${req.body.lastName}`
        },
        {
          $push: {
            data: [],
          },
        }, { upsert: true },
      );

      res.sendStatus(201);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
