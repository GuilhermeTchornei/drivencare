import db from "../config/database.js";

async function getPatientById(id) {
    return await db.query(`SELECT * FROM patients WHERE id=$1`, [id]);
}

async function getDoctorById(id) {
    return await db.query(`SELECT * FROM doctors WHERE id=$1`, [id]);
}

async function getAppointmentsByPatientId(id) {
    return await db.query(`
        SELECT d.name AS doctor_name, s.name AS specialty, b.name AS branch, p.name AS patient_name, a.start_date, a.end_date, a.status
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        JOIN specialties s ON d.specialty_id = s.id
        JOIN branchs b ON d.branch_id = b.id
        WHERE a.patient_id = $1 AND a.status <> 'FINISHED'
        `, [id]);
}

async function getAppointmentsByDoctorId(id) {
    return await db.query(`
        SELECT d.name AS doctor_name, s.name AS specialty, b.name AS branch, p.name AS patient_name, a.start_date, a.end_date, a.status
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        JOIN specialties s ON d.specialty_id = s.id
        JOIN branchs b ON d.branch_id = b.id
        WHERE a.doctor_id = $1 AND a.status <> 'FINISHED'
        `, [id]);
}


export default { getPatientById, getDoctorById, getAppointmentsByPatientId, getAppointmentsByDoctorId }