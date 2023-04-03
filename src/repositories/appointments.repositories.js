import db from "../config/database.js";

async function getDoctors({ name, specialtyId, branchId }) {
    return await db.query(`
        SELECT * FROM doctors WHERE
            (name = $1 OR $1 IS NULL) AND
            (specialty_id = $2 OR $2 IS NULL) AND
            (branch_id = $3 OR $3 IS NULL);
    `, [name, specialtyId, branchId]);
}

export default { getDoctors }