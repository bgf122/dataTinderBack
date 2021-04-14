const admin = require('firebase-admin');

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
    res.sendStatus(200);
  } catch (err) {
    res.json({ error: err.message });
  }
};
