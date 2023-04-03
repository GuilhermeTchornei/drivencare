import httpStatus from "http-status";
import signinServices from "../services/signin.services.js";

async function user(req, res, next) {
    const { email, password, type } = req.body;

    try {
        const token = await signinServices.user({ email, password, type })
        res.status(httpStatus.OK).send({ token });
    } catch (error) {
        next(error);
    }
}

export default { user };