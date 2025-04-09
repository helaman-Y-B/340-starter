// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/index");

router.get(
    "/order-list",
    utilities.checkLogin,
    utilities.handleErrors(utilities.buildOrderList)
)