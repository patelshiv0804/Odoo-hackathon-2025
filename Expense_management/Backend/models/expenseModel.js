// models/expenseModel.js
const db = require('../utils/db'); // Assuming '../utils/db' now exports your database connection/pool object

class Expense {
  /**
   * Creates a new expense entry in the database.
   * @param {Object} expenseData - Object containing expense details.
   * @returns {Promise<Object>} The newly created expense object with its ID.
   */
  static async create(expenseData) {
    const {
      user_id,
      company_id,
      category_name,
      description,
      amount,
      currency_code,
      converted_amount,
      expense_date,
      status = 'draft' // Default status
    } = expenseData;

    const sql = `
      INSERT INTO expenses
      (user_id, company_id, category_name, description, amount, currency_code, converted_amount, expense_date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(
      sql,
      [user_id, company_id, category_name, description, amount, currency_code, converted_amount, expense_date, status]
    );

    // Return the created expense with its ID, similar to your Company example
    return {
      id: result.insertId,
      user_id,
      company_id,
      category_name,
      description,
      amount,
      currency_code,
      converted_amount,
      expense_date,
      status
    };
  }

  /**
   * Finds an expense by its ID.
   * @param {number} id - The ID of the expense.
   * @returns {Promise<Object|null>} The expense object if found, otherwise null.
   */
  static async findById(id) {
    const sql = `SELECT * FROM expenses WHERE id = ?`;
    const [rows] = await db.query(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Finds all expenses for a given user ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Array<Object>>} An array of expense objects.
   */
  static async findByUserId(userId) {
    const sql = `SELECT * FROM expenses WHERE user_id = ? ORDER BY expense_date DESC`;
    const [rows] = await db.query(sql, [userId]);
    return rows;
  }

  // Add other static methods here (e.g., update, delete)
  /**
   * Updates an existing expense entry.
   * @param {number} id - The ID of the expense to update.
   * @param {Object} updateData - Object containing fields to update.
   * @returns {Promise<boolean>} True if updated, false otherwise.
   */
  static async update(id, updateData) {
    // Construct dynamic SQL update query based on provided updateData
    const fields = Object.keys(updateData);
    if (fields.length === 0) {
      return false; // No fields to update
    }

    const setClauses = fields.map(field => `${field} = ?`).join(', ');
    const values = Object.values(updateData);
    values.push(id); // Add ID for the WHERE clause

    const sql = `UPDATE expenses SET ${setClauses} WHERE id = ?`;
    const [result] = await db.query(sql, values);
    return result.affectedRows > 0;
  }

  /**
   * Deletes an expense entry by ID.
   * @param {number} id - The ID of the expense to delete.
   * @returns {Promise<boolean>} True if deleted, false otherwise.
   */
  static async delete(id) {
    const sql = `DELETE FROM expenses WHERE id = ?`;
    const [result] = await db.query(sql, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Expense;