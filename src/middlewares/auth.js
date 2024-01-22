// Import required modules
const { httpStatus, message } = require('../utils/constant');
const ApiError = require('../utils/ApiError');
const passport = require('passport');

// Callback function for passport JWT verification
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    // Check for errors, missing user, or invalid authentication token
    if (err || info || !user) {
        // If any issues are detected, reject with an unauthorized ApiError
        return reject(new ApiError(httpStatus.UNAUTHORIZED, message.INVALID_AUTH_TOKEN));
    }

    // If verification is successful, attach the user to the request object
    req.user = user;

    // Resolve the promise to continue with the next middleware
    resolve();
};

// Middleware function for handling authentication using JWT
const auth = () => async (req, res, next) => {
    // Create a new promise to handle asynchronous authentication
    return new Promise((resolve, reject) => {
        // Use passport to authenticate with the 'jwt' strategy, disable session
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    })
        .then(() => next()) // If authentication is successful, proceed to the next middleware
        .catch((err) => next(err)); // If an error occurs, pass it to the next middleware (error handler)
};

// Export the authentication middleware for use in routes or other modules
module.exports = auth;
