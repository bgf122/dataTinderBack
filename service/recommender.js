const KNNRecommender = require('knn-recommender');
const Program = require('../models/program');
const User = require('../models/user');

const kNNRecommender = new KNNRecommender.default(null);
const genreRecommender = new KNNRecommender.default(null);

exports.initializeRecommender = async () => {
  const userData = await User.find({});
  const programData = await Program.find({});
  programData.forEach((program) => kNNRecommender.addNewItemToDataset(program._id));
  userData.forEach((user) => kNNRecommender.addNewEmptyUserToDataset(user._id));

  userData.forEach((user) => user.data.forEach((program) => {
    if (program.value === 1) {
      kNNRecommender.addLikeForUserToAnItem(user._id, program.programId);
    } else if (program.value === -1) {
      kNNRecommender.addDislikeForUserToAnItem(user._id, program.programId);
    }
  }));

  await kNNRecommender.initializeRecommender().then(() => {
    console.log('Suosittelija initialisoitu.');
  });
};

exports.initializeGenreRecommender = async () => {
  const programData = await Program.aggregate([
    { $project: { subject: { $concatArrays: ['$subject'] } } },
  ]);
  const genres = await Program.distinct('subject.title.fi');
  genres.forEach((genre) => genreRecommender.addNewItemCharacteristicToDataset(genre));
  programData.forEach((program) => genreRecommender.addNewEmptyItemAsRowToDataset(program._id));

  programData.forEach((genre) => genre.subject.forEach((subject) => {
    try {
      genreRecommender.addCharacteristicForItem(genre._id, subject.title.fi);
    } catch (err) {
      console.log(err.message);
    }
  }));

  await genreRecommender.initializeRecommender().then(() => {
    console.log('Genre initialisoitu.');
  });
};

exports.getRecommendation = async (req, res) => {
  await kNNRecommender.initializeRecommenderForUserId(res.locals.uid);

  try {
    const recommendations = await kNNRecommender.generateNNewUniqueRecommendationsForUserId(res.locals.uid, { amountOfDesiredNewRecommendations: 10 });
    console.log(recommendations)
    const ids = recommendations.map(recommendation => recommendation.itemId)

    const recommendedPrograms = await Program.find({
      '_id': {
        $in: ids
      
    }});
    console.log('Suositus jaettu');
    return res.json(recommendedPrograms);
  } catch (err) {
    return res.json({ error: err.message });
  }
};

exports.addLikeForUser = async (userID, programId) => {
  await kNNRecommender.addLikeForUserToAnItem(userID, programId);
  await kNNRecommender.initializeRecommenderForUserId(userID);
  console.log('Suosittelija initialisoitu. Tykkäysswaippi.');
};

exports.addDislikeForUser = async (userID, programId) => {
  await kNNRecommender.addDislikeForUserToAnItem(userID, programId);
  await kNNRecommender.initializeRecommenderForUserId(userID);
  console.log('Suosittelija initialisoitu. Tykkäysswaippi.');
};

exports.addNewUser = async (userID) => {
  await kNNRecommender.addNewEmptyUserToDataset(userID);
  await kNNRecommender.initializeRecommenderForUserId(userID);
  console.log('Suosittelija initialisoitu. Uusi käyttäjä lisätty.');
};

exports.getSimilarItems = async (req, res) => {
  await genreRecommender.initializeRecommenderForItemId(req.params.programId);
  const similarItems = await genreRecommender.getNNearestNeighboursForItemId(req.params.programId, 10);
  const ids = similarItems.map(similarItem => similarItem.otherRowId)
 
    const similarPrograms = await Program.find({
      '_id': {
        $in: ids
      
    }});

  return res.json(similarPrograms);
};

exports.addNewUserToMatrix = async (userID) => {
  await kNNRecommender.addNewEmptyUserToDataset(userID);
};
