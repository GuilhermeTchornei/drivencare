import httpStatus from "http-status";
import appointmentsRepositories from "../repositories/appointments.repositories.js";

async function doctorsList(req, res, next) {
    const { name, specialtyId, branchId } = req.body;

    try {
        const { rows: doctors } = await appointmentsRepositories.getDoctors({ name, specialtyId, branchId });
        res.status(httpStatus.OK).send(doctors);
    } catch (error) {
        next(error);
    }
}

export default { doctorsList }