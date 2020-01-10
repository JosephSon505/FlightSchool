// initialize
const functions = require('firebase-functions');
const app = require('express')();
const FirebaseAuth = require('./util/fbAuth');

// get functions from handlers
const { getAllUsers, signup, login, uploadImage, addUserDetails, getCurrentUser, updateTeam, getTeam } = require('./handlers/users');

// User Routes
app.get('/users', getAllUsers);                     // get all uesrs from database
app.post('/signup', signup);                        // sign up: creates user in auth and also creates user in database
app.post('/login', login);                          // login with email and password
app.post('/user/image', FirebaseAuth, uploadImage); // upload profile pic for user
app.post('/user/team', FirebaseAuth, updateTeam);   // update team for user
app.get('/user/team', FirebaseAuth, getTeam);       // get team for user
app.post('/user', FirebaseAuth, addUserDetails);    // Add user details to database (lifting instagram and real instagram handles)
app.get('/user', FirebaseAuth, getCurrentUser);     // Get user details from database to display on front end

exports.api = functions.https.onRequest(app);