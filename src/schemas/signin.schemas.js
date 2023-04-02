import joi from 'joi';

const user = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    type: joi.string().valid('patient', 'doctor').required()
});

export default user;