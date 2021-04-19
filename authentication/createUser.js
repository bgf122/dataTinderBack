const admin = require('firebase-admin');
const Service = require('../service/kmeans');
const User = require('../models/user');

exports.createUser = async (req, res) => {
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
    createUserStorage(req, res);
    Service.addNewUser(req.body.email);

    res.sendStatus(200);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const createUserStorage = async (req, res) => {
  console.log(req.body.email, req.body.firstName, req.body.lastName);
  try {
    const newUser = await User.updateOne(
      {
        _id: req.body.email,
        displayName: `${req.body.firstName} ${req.body.lastName}`,
      },
      {
        $push: {
          data: {

          },
        },
      }, { upsert: true },
    );
    console.log(newUser);
  } catch (err) {
    res.json({ error: err.message });
  }
};
