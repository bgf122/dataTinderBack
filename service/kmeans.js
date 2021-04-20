const KNNRecommender = require('knn-recommender');
const Program = require('../models/program');
const User = require('../models/user');

const kNNRecommender = new KNNRecommender.default(null);

exports.initializeKmeans = async () => {
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

exports.getKmeansSuggestion = async (req) => {
  const recommendations = kNNRecommender.generateNNewUniqueRecommendationsForUserId(req.body.id, 1);
  const recommendedProgram = await Program.findById(recommendations[0].itemId);
  return recommendedProgram._doc;
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
  console.log('Suosittelija initialisoitu. Tykkäysswaippi.');
};
