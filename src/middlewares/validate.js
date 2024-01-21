const { httpStatus } = require('../utils/constant');
const ApiError = require('../utils/ApiError');
const Joi = require('joi');
const objectUtil = require('../utils/objectUtil');

const validate = (schema) => (req, res, next) => {
    const validSchema = objectUtil.pick(schema, ['params', 'query', 'body']);
    const object = objectUtil.pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object, {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate;
