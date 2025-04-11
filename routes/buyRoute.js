// Needed Resources
const express = require("express");
const router = new express.Router();
const orderController = require("../controllers/orderController")
const utilities = require("../utilities/index");

router.get(
    "/buy-form/:inv_id",
    utilities.checkLogin,
    utilities.handleErrors(orderController.buildBuyForm)
)

router.get(
   "/orders-list",
    utilities.checkLogin,
    utilities.handleErrors(orderController.buildOrderList)
)

router.post(
    "/buy-form/:inv_id",
    utilities.checkLogin,
    utilities.handleErrors(orderController.sendOrder)
)

module.exports = router;