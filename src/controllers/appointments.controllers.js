import httpStatus from "http-status";
import appointmentsRepositories from "../repositories/appointments.repositories.js";
import dayjs from "dayjs";
import customParse from 'dayjs/plugin/customParseFormat.js'
import errors from "../errors/index.js";
import appointmentsServices from "../services/appointments.services.js";

async function doctorsList(req, res, next) {
    const { name, specialtyId, branchId } = req.body;

    try {
        const { rows: doctors } = await appointmentsRepositories.getDoctors({ name, specialtyId, branchId });
        res.status(httpStatus.OK).send(doctors);
    } catch (error) {
        next(error);
    }
}

async function doctorsSchedule(req, res, next) {
    const { doctorId } = req.params;

    if (isNaN(doctorId)) throw errors.badRequest("The request contains invalid parameters");

    try {
        const schedule = await appointmentsServices.doctorsSchedule({ doctorId });
        res.status(httpStatus.OK).send(schedule);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    const { doctorId } = req.params;
    const { date } = req.body;
    const { id } = res.locals.user;
    dayjs.extend(customParse);

    try
    {
        const formattedDate = dayjs(date, 'DD-MM-YY-HH', true);

        if (isNaN(doctorId) || !dayjs(formattedDate).isValid()) throw errors.badRequest("The request contains invalid parameters");

        await appointmentsServices.bookAppointment({ doctorId, userId: id, date: formattedDate });

        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    const { status } = req.body;
    const { appointmentId } = req.params;
    const { id, type } = res.locals.user;

    try {
        if (type !== 'doctor') throw errors.unauthorized();
        if (isNaN(appointmentId)) throw errors.badRequest("The request contains invalid parameters");
        if (!(status === 'CANCELLED' || status === 'FINISHED' || status === 'ACCEPTED')) throw errors.badRequest("The request contains invalid parameters");

        await appointmentsServices.update({ doctorId: id, status, appointmentId });
        res.sendStatus(httpStatus.NO_CONTENT)
    } catch (error) {
        next(error);
    }


}

export default { doctorsList, doctorsSchedule, create, update }