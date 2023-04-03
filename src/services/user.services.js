import errors from "../errors/index.js";
import userRepositories from "../repositories/user.repositories.js";

async function myAppointments({ id, type }) {
    try {
        const myAppointments =
            type === 'patient' ?
                await userRepositories.getAppointmentsByPatientId(id) :
                await userRepositories.getAppointmentsByDoctorId(id);
         return myAppointments;
    } catch (error) {
        console.log(error);
        throw errors.internalError();
    }

}

export default { myAppointments }