// initialize
const functions = require('firebase-functions');
const app = require('express')();
const FirebaseAuth = require('./util/fbAuth');

// get functions from handlers
const { getAllUsers, signup, login, uploadImage } = require('./handlers/users');

// User routes
app.get('/users', getAllUsers);         // get all uesrs from database
app.post('/signup', signup);            // sign up: creates user in auth and also creates user in database
app.post('/login', login);              // login with email and password
app.post('/user/image', FirebaseAuth, uploadImage);         // upload profile pic for user

exports.api = functions.https.onRequest(app);