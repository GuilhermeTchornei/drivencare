import db from "../config/database.js";

async function getPatientByEmail(email) {
    return await db.query(`SELECT * FROM patients WHERE email=$1`, [email]);
}

async function getDoctorByEmail(email) {
    return await db.query(`SELECT * FROM doctors WHERE email=$1`, [email]);
}

export default { getPatientByEmail, getDoctorByEmail };