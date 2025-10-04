// models/companyModel.js
const db = require('../utils/db');

class Company {
    static async create(name, currencyCode) {
        const sql = `INSERT INTO companies (name, currency_code) VALUES (?, ?)`;
        const [result] = await db.query(sql, [name, currencyCode]);  // ✅ FIXED: destructure
        return {
            id: result.insertId,   // ✅ now you’ll get a valid insert ID
            name,
            currency_code: currencyCode
        };
    }

    static async findById(id) {
        const sql = `SELECT id, name, currency_code FROM companies WHERE id = ?`;
        const [rows] = await db.query(sql, [id]);  // ✅ also destructure here
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = Company;
