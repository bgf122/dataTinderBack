const User = require("../models/user");

exports.saveUserData = async (req, res) => {
    try {
        await User.updateOne(
            {
                "_id": res.locals.uid,
                "displayName": req.body.displayName
            },
            {
                $push: {
                    data: {
                        "programId": req.body.programId,
                        "type": req.body.type,
                        "value": req.body.value
                    }
                }
            }, { upsert: true });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.json({ message: "Ei toimi" });
    }
}

exports.getUserData = async (req, res) => {
    console.log(req.body._id);
    try {
        const data = await User.find({ _id: req.body._id })
        res.json(data);
    } catch (err) {
        res.sendStatus(400);

    }

}

