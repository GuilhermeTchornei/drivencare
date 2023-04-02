import joi from 'joi';

const patient = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    cpf: joi.string().min(11).max(11).required()
});

const doctor = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    crmStateId: joi.number().required(),
    crm: joi.string().min(6).max(6).required(),
    specialtyId: joi.number().required(),
    branchId: joi.number().required()
});


export default { patient, doctor };