const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData, 
        grid,
    })
}

/* ***************************
 *  Build inventory by inventory id view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
    const inv_id = req.params.invId
    const data = await invModel.getInventoryByInvId(inv_id)
    const vehicleGrid = await utilities.buildVehicleGrid(data)
    let nav = await utilities.getNav()

    const vehicleModel = data[0].inv_model
    res.render("./inventory/vehicle", {
        title: vehicleModel + " details",
        nav,
        vehicleGrid,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData, 
    })
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
    const classification_id = parseInt(req.params.classification_id)
    const invData = await invModel.getInventoryByClassificationId(classification_id)
    if (invData[0].inv_id) {
      return res.json(invData)
    } else {
      next(new Error("No data returned"))
    }
  }

module.exports = invCont