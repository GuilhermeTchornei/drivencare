import httpStatus from "http-status";
import userServices from "../services/user.services.js";

async function myAppointments(req, res, next) {
    const { id, type } = res.locals.user;

    try {
        const { rows: appointments} = await userServices.myAppointments({ id, type });
        res.status(httpStatus.OK).send(appointments);
    } catch (error) {
        next(error);
    }
}

export default { myAppointments }