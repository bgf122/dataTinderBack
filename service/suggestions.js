const Program = require('../models/program');
const User = require('../models/user');
const recommendationsService = require('./kmeans');

exports.getSuggestions = async (req, res) => {
  try {
    // Puukkoa, jos uusi käyttäjä niin ei löydy vielä userista sitä.

    const user = await User.findById(res.locals.user.uid) || { data: [] } // autentikoitu käyttäjä
    const userSwipeCount = user.data.length;
  
    if (userSwipeCount < 5 || userSwipeCount % 5 !== 0) {
      // käyttäjällä on alle 5 swaippia tai kokonaismäärä ei ole jaollinen 5:llä.
      // palautetaan satunnainen ohjelma.
      const swiped = await User.aggregate([
        { $match: { _id: res.locals.user.uid }}, 
        { $unwind: "$data"},
        { $group: { _id: "$data.programId"}}
      ])
  
      const Ids = swiped.map((show) => {
        return show._id
      })
  
      const random = await Program.aggregate([
        { $match: { _id: { $nin: Ids } } },
        { $sample: { size : 1}}
      ])

      return await res.json(random.map((random) => ({ ...random, suggestionType: 'random' })));
    }


    // käyttäjällä on tämän requestin hetkellä vähintään 5 swaippia ja kokonaismäärä on jaollinen 5:llä.
    // palautetaan KNN recommenderin suosittelema ohjelma.
    const recommendation = await recommendationsService.getKmeansSuggestion({ ...req, body: { id: res.locals.user.uid } }, res);

    if (recommendation) {
      return res.json([{ ...recommendation, suggestionType: 'match' }]);
    }

    // jos KNN recommender ei löytänyt suositeltavaa ohjelmaa, palautetaan satunnainen ohjelma
    // TODO: voisi refaktoroida siistimmäksi koko logiikan siitä palautetaanko satunnainen vai match ja virheenkäsittely jos matchiä ei löydy
    const suggestions = await Program.aggregate([
      { $sample: { size: Number(req.params.amount || 1) } },
    ]);
    return await res.json(suggestions.map((suggestion) => ({ ...suggestion, suggestionType: 'random' })));

  } catch (err) {
    console.log("getSuggestions")
    return res.json({ error: err.message });
  
  }
};
