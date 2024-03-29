const { httpStatus, message } = require('../utils/constant');
const userService = require('./user.service');
const emailService = require('./email.service');
const ApiError = require('../utils/ApiError');
const generatePassword = require('generate-password');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const registerUser = async (userBody) => {
    // Generate a strong password
    const generatedPassword = generatePassword.generate({
        length: 16,
        numbers: true,
        uppercase: true,
        excludeSimilarCharacters: true,
    });

    // Add the generated password to the userBody
    userBody.password = generatedPassword;
    console.log('generate password', generatedPassword);
    const user = await userService.createUser(userBody);

    // Create the user using the userService

    const body = {
        to: userBody.email,
        subject: 'SignUp Password',
        footer: "You received this email because we received a request for SignUp with that email. If you didn't request. Sign Up you can safely delete this email. Ropstamp ",
        text: `We have received a request to SignUp. Please use the following Password to proceed with the SignUp`,
        password: `${generatedPassword}`,
    };
    try {
        const response = await emailService.sendResetEmail(body);
        console.log(response);
    } catch (ex) {
        console.log(ex);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
    }
    return user;
};

const loginUserWithEmail = async (body) => {
    // Retrieve user by email from the userService
    const user = await userService.gatUserByEmail(body.email);

    // If the user does not exist, throw an unauthorized ApiError
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'The user is not registered with this email');
    }

    // Check if the provided password matches the user's stored password
    const validPassword = await userService.isPasswordMatch(body.password, user._id);

    // If the password is invalid, throw an unauthorized ApiError
    if (!validPassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED, message.INVALID_CREDENTIALS);
    }

    // Remove sensitive fields from the user object
    const userWithoutMongooseFields = user.toObject();
    delete userWithoutMongooseFields.password;

    // Log the user information without sensitive fields
    console.log('userWithoutMongooseFields', userWithoutMongooseFields);

    // Create a JWT token for authentication
    const token = jwt.sign({ _id: user._id, tokenTypes: 'AUTH' }, process.env.jwt_secret_key, {
        expiresIn: process.env.JWT_expiresIn || '30d', // Set the expiration time for the token
    });

    // Return an object containing the user information without sensitive fields and the generated token
    return { user: userWithoutMongooseFields, token };
};

module.exports = {
    registerUser,
    loginUserWithEmail,
};
