const User = require('../models/user');
const Service = require('../service/recommender');

exports.verify = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)

  const user = await User.findById(token) || null;

  if (user === null && token !== 'testi') {
    try {
      Service.addNewUserToMatrix(token);
    } catch (err) {
      console.log(err.message);
    }
  }

  if (token === 'testi' || token === 'undefined') {
    res.locals.uid = 'testi';
    next();
  } else {
    res.locals.uid = token;
    next();
  }
};
