const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        variant: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        registration_no: {
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

const Car = mongoose.model('Car', carSchema);
exports.Car = Car;
