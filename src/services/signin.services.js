import errors from "../errors/index.js";
import signinRepositories from "../repositories/signin.repositories.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

async function user({ email, password, type }) {
    const { rows: [user] } =
        type === 'patient' ?
            await signinRepositories.getPatientByEmail(email) :
            await signinRepositories.getDoctorByEmail(email);

    if (!user) throw errors.invalidCredentials();

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw errors.invalidCredentials();

    try {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        return token;
    } catch (error) {
        console.log(error);
        throw errors.internalError();
    }
}

export default { user }