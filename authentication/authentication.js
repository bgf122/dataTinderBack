const User = require('../models/user');
const Service = require('../service/recommender');

exports.verify = async (req, res, next) => {
  const token = req.headers.Authorization;
  const user = await User.findById(token) || null;

  if (user === null && token === undefined) {
  return res.json({ "error": "Virheellinen käyttäjä" })
}  

  if (user === null && token !== 'testi') {
    try {
      Service.addNewUserToMatrix(token);
    } catch (err) {
      console.log(err.message);
    }
  }

  if (token === 'testi') {
    res.locals.uid = 'testi';
    next();
  } else {
    res.locals.uid = token;
    next();
  }
};
