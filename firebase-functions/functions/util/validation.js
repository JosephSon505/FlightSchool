// Helper function: check to see if string is empty
const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
};

// Helper function: check to see if email is valid
const isEmail = (email) => {
    // reg ex expression for checking if input is an email
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) return true;
    else return false;
};

exports.validateSignupData = (data) => {
    // error checking
    let errors = {};

    // if email is empty or invalid then add to error
    if (isEmpty(data.email))        errors.email = 'Must not be empty';
    else if (!isEmail(data.email))  errors.email = 'Must be a valid email address';

    // make sure all other fields are not empty and passwords match
    if (isEmpty(data.password)) errors.password = 'Password must not be empty';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Password must match';
    if (isEmpty(data.firstName)) errors.firstName = 'First name must not be empty';
    if (isEmpty(data.lastName)) errors.lastName = 'Last name must not be empty';
    if (isEmpty(data.handle)) errors.handle = 'Handle must not be empty';

    // if any errors then return the errors
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

// make sure that log in form is filled out
exports.validateLoginData = (data) => {
    // error checking data submission
    let errors = {};
    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';

    // if any errors then return the errors
    return {
        errors, 
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

// reduces request body for updating profile into separate sections
exports.reduceUserDetails = (data) => {
    // NOTE: can add more to body and update here
    let userDetails = {};
    if(!isEmpty(data.liftInstagram.trim())) userDetails.liftInstagram = data.liftInstagram;
    if(!isEmpty(data.mainInstagram.trim())) userDetails.mainInstagram = data.mainInstagram;
    return userDetails;
}