const { db } = require('../util/admin');
const config = require('../util/config');
const firebase = require('firebase');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require('../util/validation');

exports.getAllUsers = (req, res) => {
    // get all users from database in the order of first names
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
};

exports.signup = (req, res) => {
    // get new user credentials
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        handle: req.body.handle
    };

    // make sure user fields are valid before proceeding; if not return error
    const { valid, errors } = validateSignupData(newUser);
    if(!valid) return res.status(400).json({ errors });

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
};

exports.login = (req, res) => {
    // get user credentials from the body
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    // make sure user fields are valid before proceeding; if not return error
    const { valid, errors } = validateLoginData(user);
    if(!valid) return res.status(400).json({ errors });

    // login function
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
};