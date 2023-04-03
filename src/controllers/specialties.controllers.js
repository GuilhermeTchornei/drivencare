import httpStatus from "http-status";
import getSpecialties from "../repositories/specialties.repositories.js";

async function specialties(_, res, next) {
    try {
        const { rows: specialties } = await getSpecialties();
        res.status(httpStatus.OK).send(specialties);
    } catch (error) {
        next(error);
    }
}
export default { specialties }