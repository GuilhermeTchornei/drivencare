import db from '../config/database.js';

async function checkPatient({ email, cpf }) {
    return await db.query(`SELECT * FROM patients WHERE email = $1 OR cpf=$2`, [email, cpf]);
}

async function createPatient(name, email, password, cpf) {
    await db.query(`INSERT INTO patients (name, email, password, cpf) VALUES ($1,$2,$3,$4)`, [name, email, password, cpf]);
}

async function checkDoctor({ email, crmStateId, crm }) {
    return await db.query(`SELECT * FROM doctors WHERE email = $1 OR crm_state_id=$2 AND crm=$3`, [email, crmStateId, crm]);
}

async function createDoctor(name, email, password, crmStateId, crm, specialtyId, branchId) {
    await db.query(`INSERT INTO doctors (name, email, password, crm_state_id, crm, specialty_id, branch_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [name, email, password, crmStateId, crm, specialtyId, branchId]);
}

export default { checkPatient, createPatient, checkDoctor, createDoctor };