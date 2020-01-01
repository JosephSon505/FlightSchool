// initialize 
const { db, admin } = require('../util/admin');
const config = require('../util/config');
const firebase = require('firebase');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData, reduceUserDetails } = require('../util/validation');

// get all users from database in the order of first names
exports.getAllUsers = (req, res) => {
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

// sign up new user to database
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

    // create default profile picture
    const noImg = 'no-img.png';

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
            imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
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

// log in function with email and password
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

// Update user details
exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);
    db.doc(`/Users/${req.user.handle}`).update(userDetails).then(() => {
        return res.json({ message: 'User details added successfully' });
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// get the current user's details (logged in account)
exports.getCurrentUser = (req, res) => {
    let userData = {};
    db.doc(`/Users/${req.user.handle}`).get().then(doc => {
        if(doc.exists) userData.credentials = doc.data();
        return res.json(userData);
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

// upload profile picture for user
exports.uploadImage = (req, res) => {
    // initialization
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');
    const busboy = new BusBoy({ headers: req.headers });

    // variables needed later
    let imageFileName;
    let imageToBeUploaded = {};

    // create file
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        // extract file type of image and give it a name 
        const imageExt = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random()*10000000000000)}.${imageExt}`;

        // create file path
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });

    // upload image file to database
    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        }).then(() => { 
            const imageURL = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            return db.doc(`/Users/${req.user.handle}`).update({ imageUrl: imageURL});
        }).then(() => {
            return res.json({ message: 'Image uploaded successfully' });
        }).catch(err => {
            console.error(err.code);
            return res.status(500).json({ error: err.code });
        });
    });

    busboy.end(req.rawBody);
};