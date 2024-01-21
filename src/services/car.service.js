const { httpStatus, message } = require('../utils/constant');
const ApiError = require('../utils/ApiError');
const { Car } = require('../models/car.model');

const createCar = async (carBody) => {
    try {
        console.log(carBody);
        const newCar = new Car(carBody);
        const savedCar = await newCar.save();
        return savedCar;
    } catch (error) {
        console.log(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
    }
};
const getAllCarsByUserId = async (userId) => {
    try {
        const cars = await Car.find({ user_id: userId });
        return cars;
    } catch (error) {
        console.error(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    createCar,
    getAllCarsByUserId,
};
