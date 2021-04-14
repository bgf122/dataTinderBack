
const Program = require("../models/program");
const User = require("../models/user");
const KNNRecommender = require('knn-recommender');
const kNNRecommender = new KNNRecommender.default(null)


exports.testKmeans = async (req, res) => {

    try {
        const userData = await User.find({})
        const programData = await Program.find({})

        programData.forEach(program => kNNRecommender.addNewItemToDataset(program._id))

        userData.forEach(user => kNNRecommender.addNewEmptyUserToDataset(
            user._id
        ))

        userData.forEach(user => user.data.forEach(program => {

            if (program.value === 1) {
                kNNRecommender.addLikeForUserToAnItem(user._id, program.programId);
            } else if (program.value === -1) {
                kNNRecommender.addDislikeForUserToAnItem(user._id, program.programId);
            } else {
                console.log("Tuleeko tänne jotain?")
            }

        }))

        kNNRecommender.initializeRecommenderForUserId(req.body.id)
    } catch (err) {
        kNNRecommender.initializeRecommenderForUserId(req.body.id)
    }



    const userRecommendations = kNNRecommender.generateNNewUniqueRecommendationsForUserId(req.body.id, 1)

    return res.json({ "recommendation": userRecommendations[0].itemId })
}

