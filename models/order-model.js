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
            `SELECT 
            orders.order_id AS order_id,
            orders.order_date AS order_date,
            orders.order_status AS order_status,
            account.account_firstname || ' ' || account.account_lastname AS account_fullname,
            inventory.inv_make || ' ' || inventory.inv_model AS car_name
            FROM public.orders
            JOIN public.account ON orders.account_id = account.account_id
            JOIN public.inventory ON orders.inv_id = inventory.inv_id`,
        )
        return data.rows;
    } catch (error) {
        console.error("getAllOrders error " + error);
    }
}

module.exports = { getAllOrders, addOrder };