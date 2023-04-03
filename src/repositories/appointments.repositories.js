import db from "../config/database.js";

async function getDoctors({ name, specialtyId, branchId }) {
    return await db.query(`
        SELECT * FROM doctors WHERE
            (name = $1 OR $1 IS NULL) AND
            (specialty_id = $2 OR $2 IS NULL) AND
            (branch_id = $3 OR $3 IS NULL);
    `, [name, specialtyId, branchId]);
}

async function getScheduleById({ doctorId }) {
    return await db.query(`SELECT * FROM appointments WHERE doctor_id = $1 AND status='ACCEPTED' ORDER BY start_date`, [doctorId]);
}

async function getScheduleByIdAndDate({ doctorId, date }) {
    return await db.query(`SELECT * FROM appointments WHERE doctor_id = $1 AND start_date = $2`, [doctorId, date]);
}

async function bookAppointment({ doctorId, userId, startDate, endDate }) {
    console.log(doctorId);
    await db.query(`INSERT INTO appointments (doctor_id, patient_id, start_date, end_date) VALUES ($1,$2,$3,$4)`,
        [doctorId, userId, startDate, endDate]);
}

async function getAppointmentById({ appointmentId, doctorId }) {
    return await db.query(`SELECT * FROM appointments WHERE id=$1 AND doctor_id = $2 AND (status = 'OPENED' OR status='ACCEPTED')`, [appointmentId, doctorId]);
}

async function updateStatus({ status, appointmentId }) {
    await db.query(`UPDATE appointments SET status=$1 WHERE id = $2`, [status, appointmentId]);
}

export default { getDoctors, getScheduleById, getScheduleByIdAndDate, bookAppointment, getAppointmentById, updateStatus }