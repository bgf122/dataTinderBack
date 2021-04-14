
const Program = require("../models/program");
const User = require("../models/user");
const KNNRecommender = require('knn-recommender');
const kNNRecommender = new KNNRecommender.default(null)


exports.testKmeans = async (req, res) => {

    const userData = await User.find({})
    const programData = await Program.find({})

    console.log(userData[0].data)
    console.log(programData[0]._id)

    programData.forEach(program => kNNRecommender.addNewItemToDataset(program._id))

    userData.forEach(user => kNNRecommender.addNewEmptyUserToDataset(
        user._id
    ))

    userData.forEach(user => user.data.forEach(program =>
        
        console.log(user._id, program.programId, program.value)))

    //kNNRecommender.initializeRecommenderForUserId(req.body.id)

    //const userRecommendations = kNNRecommender.generateNNewUniqueRecommendationsForUserId(req.body.id, 1)




    return res.json({
        "recommendation": `new recommendation for user 1 }`
    })
}

