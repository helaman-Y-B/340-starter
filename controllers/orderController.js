const utilities = require("../utilities/index");
const invModel = require("../models/inventory-model");
const orderModel = require("../models/order-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config()

const orderController = {}

/* ***************************
 *  Build buy form
 * ************************** */
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
        inv_id,
        accountData,
        vehicleGrid,
        errors: null,
        message: req.flash("message"),
    })
}

/* ***************************
 *  Build order list
 * ************************** */
orderController.buildOrderList = async function (req, res) {
    const nav = await utilities.getNav();
    const accountData = res.locals.accountData;
    const orders = await orderModel.getAllOrders();
    res.render("orders/orders-list", {
        title: "Orders List",
        nav,
        loggedIn: res.locals.loggedIn,
        accountData,
        orders,
        errors: null,
    })
}

orderController.sendOrder = async function (req, res) {
    const inv_id = req.params.inv_id;
    //const nav = await utilities.getNav();
    //const accountData = res.locals.accountData;
    const date = new Date();
    const order = req.body;
    const data = await orderModel.addOrder(order, inv_id, date);
    if (data) {
        req.flash("message", "Order has been Placed Successfully");
        res.redirect("/");
    } else {
        req.flash("message", "Error placing order");
        res.redirect("/orders/buy-form/" + inv_id);
    }
}

module.exports = orderController;