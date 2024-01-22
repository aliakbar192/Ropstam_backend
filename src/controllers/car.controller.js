// Import required modules
const catchAsync = require('../utils/catchAsync');
const { httpStatus, message } = require('../utils/constant');
const ApiResponse = require('../utils/ApiResponse');
const { carService } = require('../services');

// Define an asynchronous function to create a new car
const createCar = catchAsync(async (req, res) => {
    // Call the carService to create a car using request body data
    const car = await carService.createCar(req.body);

    // Send a JSON response with a success message and the created car information
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            car: car,
        }),
    );
});

// Define an asynchronous function to get all cars by user ID
const getAllCarsByUserId = catchAsync(async (req, res) => {
    // Call the carService to get all cars belonging to a specific user ID
    const cars = await carService.getAllCarsByUserId(req.body);

    // Send a JSON response with a success message and the list of cars
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            cars: cars,
        }),
    );
});

// Define an asynchronous function to delete a car by its ID
const deleteRecordById = catchAsync(async (req, res) => {
    // Call the carService to delete a car by its ID
    const car = await carService.deleteCarById(req.params.id);

    // Send a JSON response with a success message and the deleted car information
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            car: car,
        }),
    );
});

// Define an asynchronous function to get a car by its ID
const getOneCarById = catchAsync(async (req, res) => {
    // Call the carService to get a car by its ID
    const car = await carService.getOneCarById(req.params.id);

    // Send a JSON response with a success message and the retrieved car information
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            car: car,
        }),
    );
});

// Define an asynchronous function to update a car by its ID
const updateCarById = catchAsync(async (req, res) => {
    // Call the carService to update a car by its ID using request body data
    const car = await carService.updateCarById(req.params.id, req.body);

    // Send a JSON response with a success message and the updated car information
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            car: car,
        }),
    );
});

// Export the functions for use in routes or other modules
module.exports = {
    createCar,
    getAllCarsByUserId,
    deleteRecordById,
    getOneCarById,
    updateCarById,
};
