const pool = require("../database/");

/* ***************************
 *  Insert order into DB
 * ************************** */
async function addOrder(order, inv_id, date) {
    try {
        const data = await pool.query (
            `INSERT INTO public.orders (order_date, account_id, inv_id)
            VALUES ($1, $2, $3) RETURNING order_id`,
            [ date, order.account_id, inv_id]
        )
        return data.rows[0];
    } catch (error) {
        console.error("addOrder error " + error);
    }
}

/* ***************************
 *  Get all orders
 * ************************** */
async function getAllOrders() {
    try {
        const data = await pool.query(
            `SELECT * FROM public.orders`,
        )
        return data.rows;
    } catch (error) {
        console.error("getAllOrders error " + error);
    }
}

module.exports = { getAllOrders, addOrder };