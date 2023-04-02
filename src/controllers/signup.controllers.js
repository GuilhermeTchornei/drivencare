import signupServices from "../services/signup.services.js";

async function patient(req, res, next) {
    const { name, email, password, cpf } = req.body;

    try {
        await signupServices.createPatient({ name, email, password, cpf });
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}

async function doctor(req, res, next) {
    const { name, email, password, crmStateId, crm, specialtyId, branchId } = req.body;

    try {
        await signupServices.createDoctor({ name, email, password, crmStateId, crm, specialtyId, branchId });
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}

export default { patient, doctor };