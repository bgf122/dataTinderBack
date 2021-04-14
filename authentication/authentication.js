const admin = require('firebase-admin');

exports.verify = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token === 'testi') {
    // Lisätty testiä varten.
    res.locals.uid = 'testi';
    next();
  } else {
    try {
      const decodedToken = await admin
        .auth()
        .verifyIdToken(token);
      const { uid } = decodedToken;
      res.locals.user = await admin.auth().getUser(uid);
      next();
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};
