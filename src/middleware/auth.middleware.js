import errors from "../errors/index.js";
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import userRepositories from "../repositories/user.repositories.js";
env.config();

export async function authValidation(req, res, next) {
    try {
        const token = req.headers.authorization?.split("Bearer ")[1];
        if (!token) throw errors.unauthorized();

        const { userId, type } = jwt.verify(token, process.env.SECRET_KEY);

        if (!userId || !type) throw errors.unauthorized();

        const { rows: [user] } =
            type === 'patient' ?
                await userRepositories.getPatientById(userId) :
                await userRepositories.getDoctorById(userId);

        if (!user) throw errors.unauthorized();

        res.locals.user = { id: user.id, type };
        next();
    } catch (error) {
        next(error);
    }

}