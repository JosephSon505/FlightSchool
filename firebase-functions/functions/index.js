const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyB9Xc1vldsGgZZRZcMAm6cwIMFZBiw8ZGo",
    authDomain: "flightschool-ef575.firebaseapp.com",
    databaseURL: "https://flightschool-ef575.firebaseio.com",
    projectId: "flightschool-ef575",
    storageBucket: "flightschool-ef575.appspot.com",
    messagingSenderId: "1030447832442",
    appId: "1:1030447832442:web:56608c8259e2a6f8970ac3"
};

firebase.initializeApp(firebaseConfig);
admin.initializeApp();

const db = admin.firestore();

// get all users from database sorted by first name 
app.get('/users', (req, res) => {
    db.collection('Users').orderBy('firstName').get().then((data) => {
        let users = [];
        data.forEach((doc) => {
            users.push({
                userID: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                email: doc.data().email
            });
        });
        return res.json(users);
    }).catch(error => {
        res.status(500).json({error: `Error getting all users`});
        console.error("Error: " + error);    
    });
});

// create new user in database with first and last name and email
app.post('/user', (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    db.collection('User').add(newUser).then(doc => {
        res.json({message: `document ${doc.id} created successfully`});
    }).catch(error => {
        res.status(500).json({error: `Error creating user`});
        console.error("Error: " + error);
    });
});

// Helper function: check to see if string is empty
const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
};

// Helper function: check to see if email is valid
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)) return true;
    else return false;
};

// signup route
app.post('/signup', (req, res) => {
    // get new user credentials
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        handle: req.body.handle
    };

    // error checking
    let errors = {};

    // if email is empty or invalid then add to error
    if(isEmpty(newUser.email)) {
        errors.email = 'Must not be empty';
    } else if (!isEmail(newUser.email)) {
        errors.email = 'Must be a valid email address';
    }

    // make sure all other fields are not empty and passwords match
    if(isEmpty(newUser.password))                       errors.password = 'Password must not be empty';
    if(newUser.password !== newUser.confirmPassword)    errors.confirmPassword = 'Password must match';
    if(isEmpty(newUser.firstName))                      errors.firstName = 'First name must not be empty';
    if(isEmpty(newUser.lastName))                       errors.lastName = 'Last name must not be empty';
    if(isEmpty(newUser.handle))                         errors.handle = 'Handle must not be empty';

    // if any errors then return the errors
    if(Object.keys(errors).length > 0) return res.status(400).json({ errors });

    let token, userID;
    db.doc(`/Users/${newUser.handle}`).get().then(doc => {
        // check to see if user handle is already created if not create account
        if(doc.exists) {
            return res.status(400).json({ handle: "This handle is already taken" });
        } else {
            // authentication create new account
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);   
        }
    }).then(data => {
        userID = data.user.uid;
        return data.user.getIdToken();        
    }).then(tok => {
        token = tok;
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            userId: userID
        };

        // add to Users collection as well
        return db.doc(`/Users/${newUser.handle}`).set(userCredentials);
    }).then(() => {
        // return success
        return res.status(201).json({ token });
    }).catch(err => {
        console.error(`Error: ${err}`);
        if(err.code === 'auth/email-already-in-use') {
            return res.status(400).json({ email: 'Email already in use'});
        } else {
            return res.status(500).json({ error: err.code });
        }
    });
});

app.post('/login', (req, res) => {
    // get user credentials from the body
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    // error checking user submission
    let errors = {};
    if(isEmpty(user.email)) errors.email = 'Must not be empty';
    if(isEmpty(user.password)) errors.password = 'Must not be empty';
    if(Object.keys(errors).length > 0) return res.status(400).json({ errors });

    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(data => {
        return data.user.getIdToken();
    }).then(token => {
        return res.json(token);
    }).catch(err => {
        console.error(err);
        if(err.code === 'auth/wrong-password') {
            return res.status(403).json({ general: 'Incorrect password, Please try again'});
        } else {
            return res.status(500).json({error: err.code});
        }
    });
});

exports.api = functions.https.onRequest(app);