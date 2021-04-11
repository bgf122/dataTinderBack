const admin = require('firebase-admin');

exports.verify = async (req, res, next) => {
	const token = req.headers.authorization;

	if (token === "testi") {
		// Lisätty testiä varten.
		res.locals.uid = "testi";
		next();
	} else {
		// If firebase-module is able to verify token -> goes forward. Otherwise catches error returns 403.
		try {
			const decodedToken = await admin
				.auth()
				.verifyIdToken(token)
			const uid = decodedToken.uid;
			res.locals.uid = uid
			next();
		} catch (err) {
			console.log(err.message);
			res.status(403).json({ "error": "Invalid or bad token" })
		}
	}
}


