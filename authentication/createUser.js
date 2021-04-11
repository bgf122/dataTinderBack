const admin = require('firebase-admin');

exports.createUser = async (req, res) => {
    try {
        const userRecord = await admin.auth()
            .createUser({
                uid: req.body.email,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                displayName: `${req.body.firstname} + ${req.body.lastname}`,
                password: req.body.password,
                disabled: false,
        })
        res.sendStatus(200);
        console.log('Successfully created new user:', userRecord);
    } catch (err) {
        res.json(err);
        console.log('Error creating new user:', err);
    }
}