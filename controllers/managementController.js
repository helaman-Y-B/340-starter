//const managementModel = require("../models/management-model")
const utilities = require("../utilities/")

const management = {}

/* ***************************
 *  Build management view
 * ************************** */
management.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
        title: "Management page",
        nav,
    })
}

module.exports = management;