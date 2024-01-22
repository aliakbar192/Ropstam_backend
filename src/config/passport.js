// Import required modules
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const ApiError = require('../utils/ApiError');
const { httpStatus, message } = require('../utils/constant');
const { userService } = require('../services');
const { User } = require('../models/user.model');
require('dotenv').config();

// Define JWT options for authentication
const jwtOptions = {
    secretOrKey: process.env.jwt_secret_key, // Secret key for JWT verification
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the authorization header
};

// Verify function for JWT authentication
const jwtVerify = async (payload, done) => {
    try {
        // Check if the token type is 'AUTH'
        if (!payload.tokenTypes || payload.tokenTypes !== 'AUTH') {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token type');
        }

        // Retrieve user from the database using the user ID in the payload
        const user = await userService.getUserById(payload._id);

        // If the user does not exist, authentication fails
        if (!user) {
            return done(null, false);
        }

        // Authentication successful, pass the user to the next middleware
        done(null, user);
    } catch (error) {
        // Handle any errors during authentication
        done(error, false);
    }
};

// Create a new instance of JwtStrategy with defined options and verification function
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

// Export the JwtStrategy for use in Passport configuration
module.exports = {
    jwtStrategy,
};
