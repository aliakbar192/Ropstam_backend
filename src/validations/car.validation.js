const Joi = require('joi');

const create = {
    body: Joi.object().keys({
        make: Joi.string().required(),
        model: Joi.string().required(),
        year: Joi.string().required(),
        variant: Joi.string().required(),
        category: Joi.string().required(),
        color: Joi.string().required(),
        user_id: Joi.string().required(),
        registration_no: Joi.string().required(),
    }),
};

const getAllCarByUserId = {
    params: Joi.object().keys({
        userId: Joi.string().required(),
    }),
};
const getUser = {};
module.exports = {
    create,
    getAllCarByUserId,
};
