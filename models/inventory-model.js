const pool = require("../database/");
const { get } = require("../routes/static");

/* ***************************
 *  Get all classification data
 * ************************** */

async function getClassifications() {
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i
            JOIN public.classification AS c
            ON i.classification_id = c.classification_id
            WHERE i.classification_id = $1`,
            [classification_id]
        )
        return data.rows;
    } catch (error) {
        console.error("getclassificationbyid error " + error);
    }
}

async function getInventoryByInvId(inv_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM inventory
            WHERE inv_id = ${inv_id}`
        )
        return data.rows;
    } catch (error) {
        console.error("getInventoryByInvId error " + error);
    }
    
}

async function postNewClassification(classification_name) {
    try {
        const sql = await pool.query(
            `INSERT INTO classification (
            classification_name
            ) VALUES (
            ${classification_name} 
            )`
        )
        return await pool.query(sql, [classification_name])
    } catch (error) {
        console.error("postNewClassification error " + error);
    }
}


module.exports = { getClassifications, getInventoryByClassificationId, getInventoryByInvId, postNewClassification };