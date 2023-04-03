import db from "../config/database.js";

export default async function getBranchs() {
    return await db.query(`SELECT * FROM branchs`);
}
