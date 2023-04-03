import httpStatus from "http-status";
import getBranchs from "../repositories/branchs.repositores.js";

async function branch(_, res, next) {
    try {
        const { rows: branchs } = await getBranchs();
        res.status(httpStatus.OK).send(branchs);
    } catch (error) {
        next(error);
    }
}

export default { branch }