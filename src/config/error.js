// Import required modules
const sequelize = require('sequelize');
const { httpStatus, message: messages } = require('../utils/constant');
const logger = require('./logger');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

module.exports = (app) => {
    // Middleware to convert non-API errors to ApiError
    app.use((err, req, res, next) => {
        let error = err;

        // Check if the error is not an instance of ApiError
        if (!(error instanceof ApiError)) {
            // Determine status code based on error type
            const statusCode =
                error.statusCode || error instanceof sequelize.Error
                    ? httpStatus.BAD_REQUEST
                    : httpStatus.INTERNAL_SERVER_ERROR;

            // Set default error message if not provided
            const message = error.message || messages.INTERNAL_SERVER_ERROR;

            // Create an instance of ApiError
            error = new ApiError(statusCode, message, false, err.stack);
        }

        // Pass the modified error to the next middleware
        next(error);
    });

    // Middleware to handle API errors
    app.use((err, req, res, next) => {
        // Extract status code and message from the error
        let { statusCode, message } = err;

        // If the error is not operational, set a generic internal server error
        if (!err.isOperational) {
            statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            message = messages.INTERNAL_SERVER_ERROR;
        }

        // Set the error message in locals for potential use in subsequent middleware
        res.locals.errorMessage = err.message;

        // Construct a response object with the error details
        const error = {
            ...{ stack: err.stack },
        };

        // Log the error using the logger
        logger.error(err);

        // Send the error as a JSON response
        res.json(new ApiResponse(statusCode, message, error));
    });
};
