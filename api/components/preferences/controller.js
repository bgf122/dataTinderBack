const admin = require('firebase-admin');

const db = admin.database();

exports.saveUserPreference = async (req, res) => {
    try {
        const prefence = {
            program_id: req.body.program_id,
            swipe: req.body.swipe
        }
        await db.ref('users').child(res.locals.uid).child('preferences').push(prefence);
        res.sendStatus(200);
    } catch (err) {
        res.json({ message: err });
    }
}

exports.getUserPreferences = async (req, res) => {

    try {
        let data;
        await db.ref("users")
            .child(res.locals.uid)
            .child("preferences/")
            .once("value", (snapshot) => {
                data = snapshot.val()
            });
        return res.json({ data });

    } catch (err) {
        res.sendStatus(400);

    }

}

