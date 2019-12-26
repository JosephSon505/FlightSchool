const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello world!");
});

exports.getUsers = functions.https.onRequest((req, res) => {
    admin.firestore().collection('User').get().then((data) => {
        let users = [];
        data.forEach((doc) => {
            users.push(doc.data());
        });
        return res.json(users);
    }).catch(error => {
        console.error("Error: " + error);
    });
});

exports.createUser = functions.https.onRequest((req, res) => {
    if(req.method !== 'POST') {
        return res.status(400).json({error: 'Method not allowed'});
    }

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    admin.firestore().collection('User').add(newUser).then(doc => {
        res.json({message: `document ${doc.id} created successfully`});
    }).catch(error => {
        res.status(500).json({error: `Error creating user`});
        console.error("Error: " + error);
    });
});