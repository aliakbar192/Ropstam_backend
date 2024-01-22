// Custom error class for handling API-specific errors
class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode; // HTTP status code for the error response
        this.isOperational = isOperational; // Flag indicating whether the error is operational
        this.stack = stack || Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;
