// Import required modules
const { httpStatus } = require('../utils/constant');
const ApiError = require('../utils/ApiError');
const Joi = require('joi');
const objectUtil = require('../utils/objectUtil');

// Middleware function for request validation using Joi
const validate = (schema) => (req, res, next) => {
    // Pick only the relevant parts of the schema (params, query, body)
    const validSchema = objectUtil.pick(schema, ['params', 'query', 'body']);

    // Pick only the relevant parts of the request object based on the schema
    const object = objectUtil.pick(req, Object.keys(validSchema));

    // Validate the picked object against the compiled schema
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object, {
            abortEarly: false, // Report all validation errors, not just the first one
            allowUnknown: true, // Allow unknown properties in the request object
            stripUnknown: true, // Remove unknown properties from the request object
        });

    // If there are validation errors, create an ApiError with a BAD_REQUEST status and error details
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    // If validation is successful, assign the validated value to the request object
    Object.assign(req, value);

    // Continue to the next middleware
    return next();
};

// Export the validation middleware for use in routes or other modules
module.exports = validate;
