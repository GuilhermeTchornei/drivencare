import db from "../config/database.js";

async function getPatientById(id) {
    return await db.query(`SELECT * FROM patients WHERE id=$1`, [id]);
}

async function getDoctorById(id) {
    return await db.query(`SELECT * FROM doctors WHERE id=$1`, [id]);
}

export default { getPatientById, getDoctorById }