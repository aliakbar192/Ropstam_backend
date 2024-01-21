const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        paranoid: true,
    },
);

const User = mongoose.model('User', userSchema);
exports.User = User;
exports.userSchema = userSchema;
