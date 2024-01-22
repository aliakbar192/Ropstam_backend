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
    body: Joi.object().keys({
        page: Joi.number().required(),
        user_id: Joi.string().required(),
        pageSize: Joi.number().required(),
        category: Joi.string().required(),
    }),
};
const deleteCarById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};
const getOneCarById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};
const UpdateCarById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        make: Joi.string().required(),
        model: Joi.string().required(),
        year: Joi.string().required(),
        variant: Joi.string().required(),
        category: Joi.string().required(),
        color: Joi.string().required(),
        registration_no: Joi.string().required(),
    }),
};
module.exports = {
    create,
    getAllCarByUserId,
    deleteCarById,
    getOneCarById,
    UpdateCarById,
};
