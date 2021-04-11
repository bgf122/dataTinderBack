const admin = require('firebase-admin');

exports.createUser = async (req, res) => {
    const serviceAccount = {
        "type": process.env.FIREBASE_TYPE,
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
    try {
        const userRecord = await admin.auth()
            .createUser({
                uid: req.body.email,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                displayName: req.body.email,
                password: req.body.password,
                disabled: false,
        })
        res.sendStatus(200);
        console.log('Successfully created new user:', userRecord.uid);
        admin.app.delete();
    } catch (err) {
        admin.app.delete();
        res.sendStatus(403);
        console.log('Error creating new user:', err);
    }
}