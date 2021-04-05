const admin = require('firebase-admin');

const db = admin.database();

exports.saveUserPreference = async (req, res) => {

	try {
		const prefence = { 
            program_id: req.body.program_id,
            swipe: req.body.swipe
        }
        const savedData = await db.ref('users').child(res.locals.uid).child('preferences').push(prefence);
        res.json(savedData);
	} catch (err) {
		res.json({ message: err });
	}
};