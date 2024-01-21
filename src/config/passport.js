const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const ApiError = require('../utils/ApiError');
const { httpStatus, message } = require('../utils/constant');
const { userService } = require('../services');
require('dotenv').config();

const jwtOptions = {
    secretOrKey: process.env.jwt_secret_key,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {
        console.log('asdasdasd', payload);
        if (!payload.tokenTypes || payload.tokenTypes !== 'AUTH') {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token type');
        }
        const user = await userService.getUserById(payload._id);
        if (!user) {
            console.log('User not found');
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};
