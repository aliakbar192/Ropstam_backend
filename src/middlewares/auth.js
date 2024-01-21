const { httpStatus, message } = require('../utils/constant');
const ApiError = require('../utils/ApiError');
const passport = require('passport');

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, message.INVALID_AUTH_TOKEN));
    }
    req.user = user;
    resolve();
};

const auth = () => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

module.exports = auth;
