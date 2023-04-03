import db from "../config/database.js";

export default async function getSpecialties() {
    return await db.query(`SELECT * FROM specialties`);
}