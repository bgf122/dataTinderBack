const User = require("../models/user");

exports.saveUserData = async (req, res) => {
    try {
        await User.updateOne(
            { 
                "_id": req.body._id,
                "displayName": req.body.displayName
            },
            { $push: { "data": {
                    "programId": req.body.data.programId,
                    "type": req.body.data.type,
                    "value": req.body.data.value
                }
            }
        });
        res.sendStatus(200);
    } catch (err) {
        res.json({ message: err });
    }
}

exports.getUserData = async (req, res) => {
    try {
        const data = await User.find(req.body._id)
        res.json(data);
    } catch (err) {
        res.sendStatus(400);

    }

}

