import errors from "../errors/index.js";
import signupRepositories from "../repositories/signup.repositories.js";
import bcrypt from 'bcrypt';

async function createPatient({ name, email, password, cpf }) {
    const { rowCount } = await signupRepositories.checkPatient({ email, cpf });
    if (rowCount) throw errors.duplicatedData("email or cpf");

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        await signupRepositories.createPatient(name, email, hashPassword, cpf);
    } catch (error) {
        throw errors.internalError(error);
    }
}

async function createDoctor({ name, email, password, crmStateId, crm, specialtyId, branchId }) {
    const { rowCount } = await signupRepositories.checkDoctor({ email, crmStateId, crm });
    if (rowCount) throw errors.duplicatedData("email or crm");

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        await signupRepositories.createDoctor(name, email, hashPassword, crmStateId, crm, specialtyId, branchId);
    } catch (error)
    {
        console.log(error);
        throw errors.internalError();
    }

}

export default { createPatient, createDoctor };