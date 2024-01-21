const { httpStatus, message } = require('../utils/constant');
const { User } = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const createUser = async (userBody) => {
    let user = await User.findOne({ email: userBody.email });
    console.log('enter to register ', userBody);

    if (user) {
        throw new ApiError(httpStatus.CONFLICT, message.USER_ALREADY_EXIST);
    }
    console.log(userBody);
    user = new User(_.pick(userBody, ['firstName', 'lastName', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(userBody.password, salt);
    console.log(user);
    user = await user.save();
    return user;
};
const gatUserByEmail = async (email) => {
    let users = await User.findOne({ email: email });
    console.log('get emailuser ', users);
    return users;
};
const isPasswordMatch = async function (password, userId) {
    const user = await User.findById(userId);
    console.log(userId);
    return bcrypt.compare(password, user.password);
};

module.exports = {
    createUser,
    gatUserByEmail,
    isPasswordMatch,
};
