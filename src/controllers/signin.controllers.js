import signinServices from "../services/signin.services.js";

async function user(req, res, next) {
    const { email, password, type } = req.body;

    try {
        const token = await signinServices.user({ email, password, type })
        res.status(200).send({ token });
    } catch (error) {
        next(error);
    }
}

export default { user };