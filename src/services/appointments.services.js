import dayjs from "dayjs";
import errors from "../errors/index.js";
import userRepositories from "../repositories/user.repositories.js";
import appointmentsRepositories from "../repositories/appointments.repositories.js";

async function doctorsSchedule({ doctorId }) {
    const { rows: [doctor] } = await userRepositories.getDoctorById(doctorId);
    if (!doctor) throw errors.notFound();

    try
    {
        const { rows: schedule } = await appointmentsRepositories.getScheduleById({ doctorId });
        return schedule;
    } catch (error)
    {
        throw errors.internalError();
    }
}


async function bookAppointment({ doctorId, userId, date }) {
    if (date.diff(dayjs()) < 0) throw errors.badRequest("date is invalid");
    if (date.day() === 0 || date.day()  === 6) throw errors.badRequest("day is invalid");
    if (date.hour() < 9 || date.hour() === 12 || date.hour() > 18) throw errors.badRequest("hour is invalid");

    const { rowCount } = await appointmentsRepositories.getScheduleByIdAndDate({ doctorId, date });
    if (rowCount) throw errors.duplicatedData("time slot already booked");

    const endDate = date.add(1, 'hour');
    console.log(doctorId);
    await appointmentsRepositories.bookAppointment({ doctorId, userId, startDate: date, endDate });
}

async function update({ doctorId, status, appointmentId }) {
    const { rowCount } = await appointmentsRepositories.getAppointmentById({ appointmentId, doctorId });
    if (!rowCount) throw errors.notFound();
    try {
        await appointmentsRepositories.updateStatus({ status, appointmentId });
    } catch (error) {
        throw errors.internalError();
    }
}

export default { doctorsSchedule, bookAppointment, update }