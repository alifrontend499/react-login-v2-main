// Validations
const Joi = require('@hapi/joi')

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).allow('').optional(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

module.exports.loginValidation = loginValidation
module.exports.registerValidation = registerValidation