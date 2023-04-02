import errors from "../errors/index.js";
import signupRepositories from "../repositories/signup.repositories.js";
import bcrypt from 'bcrypt';

async function createPatient({ name, email, password, cpf }) {
    const { rowCount } = await signupRepositories.checkPatient({ email, cpf });
    if (rowCount) throw errors.duplicatedData("email or cpf");

    const hashPassword = await bcrypt.hash(password, 10);
    await signupRepositories.createPatient(name, email, hashPassword, cpf);
}

export default { createPatient };