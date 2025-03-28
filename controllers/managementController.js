const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")


const management = {}

/* ***************************
 *  Build management view
 * ************************** */
management.buildManagement = async function (req, res) {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
        title: "Management page",
        nav,
    })
}

/* ***************************
 *  Build add-classification view
 * ************************** */
management.buildAddClassification = async function (req, res) {
    //const data = await invModel.pushNewClassification(classification_name)

    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
        title: "Add Classification page",
        nav,
    })
}



module.exports = management;