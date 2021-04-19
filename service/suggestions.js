const Program = require('../models/program');
const User = require('../models/user');
const recommendationsService = require('./kmeans');

exports.getSuggestions = async (req, res) => {
  try {
    const user = await User.findById(res.locals.user.uid); // autentikoitu käyttäjä
    const userSwipeCount = user.data.length; // käyttäjän swaippien kokonaismäärä

    if (userSwipeCount > 0 && userSwipeCount % 5 === 0) {
      // käyttäjällä on tämän requestin hetkellä vähintään 5 swaippia ja kokonaismäärä on jaollinen 5:llä.
      // palautetaan KNN recommenderin suosittelema ohjelma.
      const recommendation = await recommendationsService.getKmeansSuggestion({ ...req, body: { id: res.locals.user.uid } }, res);
      res.json([{ ...recommendation, suggestionType: 'match' }]);
    } else {
      // käyttäjällä on alle 5 swaippia tai kokonaismäärä ei ole jaollinen 5:llä.
      // palautetaan satunnainen ohjelma.
      const suggestions = await Program.aggregate([
        { $sample: { size: Number(req.params.amount || 1) } },
      ]);
      res.json(suggestions.map((suggestion) => ({ ...suggestion, suggestionType: 'random' })));
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};
