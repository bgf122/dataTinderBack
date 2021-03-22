const admin = require('firebase-admin');

const serviceAccount = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
}

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_DATABASE_URL
});

exports.verify = (req, res, next) => {

	const token = req.headers.authorization;
	admin
			.auth()
			// If firebase-module is able to verify token -> goes forward. Otherwise catches error returns 403.
			.verifyIdToken(token)
			.then((decodedToken) => {
				const uid = decodedToken.uid;
        console.log(uid)
			}).then(next)
			.catch((error) => {
				console.log(error.message);
				res.status(403).json({ "error": "Invalid or bad token"})
			});
	}
		
	
