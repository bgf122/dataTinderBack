exports.verify = async (req, res, next) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  try {
    if (token === 'testi') {
    // Lisätty testiä varten.
      res.locals.uid = 'testi';
      next();
    } else {
      res.locals.uid = token;
      next();
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};
