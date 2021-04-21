const Program = require('../models/program');
const User = require('../models/user');
const recommendationsService = require('./kmeans');

exports.getSuggestions = async (req, res) => {
  try {
    // Puukkoa, jos uusi käyttäjä niin ei löydy vielä userista sitä.
    const user = await User.findById(res.locals.user.uid) || { data: [] } // autentikoitu käyttäjä
    const userSwipeCount = user.data.length;
   
    if (userSwipeCount < 5 || userSwipeCount % 5 === 0) {
      // käyttäjällä on alle 5 swaippia tai kokonaismäärä ei ole jaollinen 5:llä.
      // palautetaan satunnainen ohjelma.
      const suggestions = await Program.aggregate([
        { $sample: { size: Number(req.params.amount || 1) } },
      ]);
      return res.json(suggestions.map((suggestion) => ({ ...suggestion, suggestionType: 'random' })));
    }

    // käyttäjällä on tämän requestin hetkellä vähintään 5 swaippia ja kokonaismäärä on jaollinen 5:llä.
    // palautetaan KNN recommenderin suosittelema ohjelma.
    const recommendation = await recommendationsService.getKmeansSuggestion({ ...req, body: { id: res.locals.user.uid } }, res);
    return res.json([{ ...recommendation, suggestionType: 'match' }]);

  } catch (err) {
    console.log("getSuggestions")
    res.json({ error: err.message });
  
  }
};
