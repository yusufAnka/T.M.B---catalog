const Joi = require('joi')

function newInput() {
    return Joi.object({
        "imageUrl": Joi.string().required(),
        "name": Joi.string().min(2).required(),
        "Quantity": Joi.number().required(),
        "Description": Joi.string().min(10).required(),
        "price": Joi.number().integer().required(),
        "size": Joi.string().max(2).required(),
        "type": Joi.string().required(),
    })
}

function updateInput() {
    return Joi.object({
        "imageUrl": Joi.string(),
        "name": Joi.string(),
        "Quantity": Joi.number(),
        "Description": Joi.string(),
        "price": Joi.number(),
        "size": Joi.string(),
        "type": Joi.string()
    })
}

function userInfo() {
    return Joi.object({
        "username": Joi.string().min(5).required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().min(8).required(),
        "confirmPassword": Joi.string().min(8).required(),
        "phone": Joi.string().min(8).required(),
        "userType": Joi.string().min(4).max(5).required()
    })
}

function userDetails() {
    return Joi.object({
        "email": Joi.string().email().required(),
        "password": Joi.string().required(),
    })
}

module.exports = {
    newInput,
    updateInput,
    userInfo,
    userDetails
}