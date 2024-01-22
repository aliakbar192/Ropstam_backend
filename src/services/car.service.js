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

const getAllCarsByUserId = async (body) => {
    try {
        console.log(body);

        if (body.page < 0 || body.pageSize <= 0) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid pagination parameters');
        }

        const skip = Math.max((body.page - 1) * body.pageSize, 0);
        console.log('Skip:', skip);

        const cars = await Car.find({ user_id: body.user_id }).skip(skip).limit(body.pageSize);

        const totalCount = await Car.countDocuments({ user_id: body.user_id });

        const totalPages = Math.ceil(totalCount / body.pageSize);

        return { cars, totalCount, totalPages };
    } catch (error) {
        console.error(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
    }
};
const deleteCarById = async (id) => {
    try {
        const deletedCar = await Car.deleteOne({ _id: id });
        return deletedCar;
    } catch (error) {
        console.error(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
    }
};
const getOneCarById = async (id) => {
    try {
        const car = await Car.findOne({ _id: id });
        return car;
    } catch (error) {
        console.error(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
    }
};
const UpdateCarById = async (id, body) => {
    try {
        const updatedCar = await Car.findOneAndUpdate(
            { _id: id },
            { $set: body },
            { new: true }, // Returns the modified document
        );

        if (!updatedCar) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Car not found');
        }

        return updatedCar;
    } catch (error) {
        console.error(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
    }
};
module.exports = {
    createCar,
    getAllCarsByUserId,
    deleteCarById,
    getOneCarById,
    UpdateCarById,
};
