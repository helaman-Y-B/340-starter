const bcrypt = require("bcryptjs");

/* **********************
 *   Check for existing email
 * ********************* */

async function checkExistingEmail(account_email) {
  try {
    console.log("Querying database for email:", account_email);
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    console.log("Query result:", email.rows[0]);
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Register new account
* *************************** */

const pool = require("../database/index")

async function postRegistration(account_firstname, account_lastname, account_email, account_password){
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(account_password, 10);
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, hashedPassword])
  } catch (error) {
    return error.message
  }
}

/* *****************************
* Update account data
* ***************************** */
async function updateAccount(account_firstname, account_lastname, account_email, account_id) {
  try {
    const sql = "UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_id]);
  } catch (error) {
    return error.message
  }
}

/* *****************************
* Update password account
* ***************************** */
async function updateAccountPassword(account_password, account_id) {
  try {
    const sql = "UPDATE account SET account_password = $1 WHERE account_id = $2 RETURNING *"
    return await pool.query(sql, [account_password, account_id]);
  } catch (error) {
    return error.message
  }
}

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

module.exports = { checkExistingEmail, updateAccount, updateAccountPassword, postRegistration, getAccountByEmail }