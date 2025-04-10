const utilities = require("../utilities/index");
const invModel = require("../models/inventory-model");
//const orderModel = require("../models/order-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config()

const orderController = {}

orderController.buildBuyForm = async function (req, res) {
    const inv_id = req.params.inv_id;
    const nav = await utilities.getNav();
    const accountData = res.locals.accountData;
    const data = await invModel.getInventoryByInvId(inv_id)
    const vehicleGrid = await utilities.buildVehicleGridForm(data)
    res.render("orders/buy-form", {
        title: "Buy Form",
        nav,
        loggedIn: res.locals.loggedIn,
        accountData,
        vehicleGrid,
        errors: null,
        message: req.flash("message"),
    })
}

module.exports = orderController;