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
        const preferences = await db.ref("users")
            .child(res.locals.uid)
            .child("preferences/")
            .once("value", (snapshot) => {
                let data = [];
                snapshot.forEach((child) => {
                    data.push(child.val()
                    );
                });


            })
        return res.json({ preferences });

    } catch (err) {
        res.sendStatus(400);

    }

}

