const db = require('../utils/db');

class User {
    static async create(companyId, firstName, lastName, email, hashedPassword, role = 'employee', managerId = null) {
    const sql = `
        INSERT INTO users 
        (company_id, first_name, last_name, email, password, role, manager_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        companyId,
        firstName,
        lastName,
        email,
        hashedPassword,
        role,
        managerId
    ]);
    return { id: result.insertId, companyId, email, role };
}

    static async findByEmail(email) {
        const sql = `
            SELECT u.id, u.company_id, u.first_name, u.last_name, u.email, u.password, u.role, c.currency_code
            FROM users u
            JOIN companies c ON u.company_id = c.id
            WHERE u.email = ?
        `;
        const [rows] = await db.query(sql, [email]);   // ✅ FIXED — destructure here
        console.log('findByEmail rows:', rows);
        return rows.length > 0 ? rows[0] : null;       // ✅ rows is now array of results
    }

    static async findById(id) {
        const sql = `SELECT id, company_id, first_name, last_name, email, role FROM users WHERE id = ?`;
        const [rows] = await db.query(sql, [id]);      // ✅ FIXED same issue
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = User;
