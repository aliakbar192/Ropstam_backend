const catchAsync = require('../utils/catchAsync');
const { httpStatus, message } = require('../utils/constant');
const ApiResponse = require('../utils/ApiResponse');
const { carService } = require('../services');

const createCar = catchAsync(async (req, res) => {
    const car = await carService.createCar(req.body);
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            car: car,
        }),
    );
});
const getAllCarsByUserId = catchAsync(async (req, res) => {
    const car = await carService.getAllCarsByUserId(req.body);
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            car: car,
        }),
    );
});
const DeleteReocrdBtId = catchAsync(async (req, res) => {
    const car = await carService.deleteCarById(req.params.id);
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            car: car,
        }),
    );
});
const getOneCarById = catchAsync(async (req, res) => {
    const car = await carService.getOneCarById(req.params.id);
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            car: car,
        }),
    );
});
const UpdateCarById = catchAsync(async (req, res) => {
    const car = await carService.UpdateCarById(req.params.id, req.body);
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            car: car,
        }),
    );
});
module.exports = {
    createCar,
    getAllCarsByUserId,
    DeleteReocrdBtId,
    getOneCarById,
    UpdateCarById,
};
