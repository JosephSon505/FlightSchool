// initialize
const functions = require('firebase-functions');
const app = require('express')();

// get functions from handlers
const { getAllUsers, signup, login } = require('./handlers/users');

// User routes
app.get('/users', getAllUsers);         // get all uesrs from database
app.post('/signup', signup);            // sign up --> also creates user into database
app.post('/login', login);              // login with email and password

exports.api = functions.https.onRequest(app);