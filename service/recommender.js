const KNNRecommender = require('knn-recommender');
const Program = require('../models/program');
const User = require('../models/user');

const kNNRecommender = new KNNRecommender.default(null);

exports.initializeRecommender = async () => {
  const userData = await User.find({});
  const programData = await Program.aggregate([
    { $project: { subject: { $concatArrays: ['$subject'] } } },
  ]);

  const genres = await Program.distinct('subject.title.fi');
  programData.forEach((genre) => kNNRecommender.addNewItemToDataset(genre._id));
  programData.forEach((program) => kNNRecommender.addNewEmptyItemAsRowToDataset(program._id));
  genres.forEach((genre) => kNNRecommender.addNewItemCharacteristicToDataset(genre));
  userData.forEach((user) => kNNRecommender.addNewEmptyUserToDataset(user._id));
  userData.forEach((user) => user.data.forEach((program) => {
    if (program.value === 1) {
      kNNRecommender.addLikeForUserToAnItem(user._id, program.programId);
    } else if (program.value === -1) {
      kNNRecommender.addDislikeForUserToAnItem(user._id, program.programId);
    }
  }));
  programData.forEach((genre) => genre.subject.forEach((subject) => {
    try {
      kNNRecommender.addCharacteristicForItem(genre._id, subject.title.fi);
    } catch (err) {
      console.log(err.message);
    }
  }));
  console.log('Lisätty genret');
};

exports.getRecommendation = async (req, res) => {
  await kNNRecommender.initializeRecommenderForUserId(res.locals.uid);

  try {
    const recommendations = kNNRecommender.generateNNewUniqueRecommendationsForUserId(res.locals.uid, 1);
    const recommendedProgram = await Program.findById(recommendations[0].itemId);
    return recommendedProgram._doc;
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
  await kNNRecommender.initializeRecommenderForItemId(req.body.programId);
  const similarItems = await kNNRecommender.getNNearestNeighboursForItemId(req.body.programId, 10);

  return res.json(similarItems);
};
