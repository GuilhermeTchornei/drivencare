import db from '../config/database.js';

async function checkPatient({ email, cpf }) {
    return await db.query(`SELECT * FROM patients WHERE email = $1 OR cpf=$2`, [email, cpf]);
}

async function createPatient(name, email, password, cpf) {
    await db.query(`INSERT INTO patients (name, email, password, cpf) VALUES ($1,$2,$3,$4)`, [name, email, password, cpf]);
}

export default { checkPatient, createPatient };